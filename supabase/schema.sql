-- Create schema for QikTix UK

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  user_role TEXT DEFAULT 'attendee' CHECK (user_role IN ('attendee', 'organizer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  venue TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  country TEXT NOT NULL DEFAULT 'United Kingdom',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT NOT NULL,
  banner_image TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  has_seating_map BOOLEAN DEFAULT FALSE,
  seating_map_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ticket_types table
CREATE TABLE ticket_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  quantity INTEGER NOT NULL,
  remaining_quantity INTEGER NOT NULL,
  max_per_order INTEGER DEFAULT 10,
  sale_start_date TIMESTAMP WITH TIME ZONE,
  sale_end_date TIMESTAMP WITH TIME ZONE,
  is_early_bird BOOLEAN DEFAULT FALSE,
  is_vip BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_type_id UUID REFERENCES ticket_types(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  order_id UUID,
  qr_code TEXT,
  seat_info JSONB,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  ticket_type_id UUID REFERENCES ticket_types(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ticket_transfers table
CREATE TABLE ticket_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_email TEXT,
  transfer_code TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  ticket_type_id UUID REFERENCES ticket_types(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified_at TIMESTAMP WITH TIME ZONE,
  UNIQUE (event_id, user_id, ticket_type_id)
);

-- Create event_reviews table
CREATE TABLE event_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (event_id, user_id)
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Organizers can view their own events"
  ON events FOR SELECT
  USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can insert their own events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their own events"
  ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete their own events"
  ON events FOR DELETE
  USING (auth.uid() = organizer_id);

-- Ticket types policies
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ticket types for published events"
  ON ticket_types FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = ticket_types.event_id
      AND (events.is_published = TRUE OR events.organizer_id = auth.uid())
    )
  );

CREATE POLICY "Organizers can manage ticket types for their events"
  ON ticket_types FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = ticket_types.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Tickets policies
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets"
  ON tickets FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Organizers can view tickets for their events"
  ON tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = tickets.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Orders policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Organizers can view orders for their events"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = orders.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Create functions and triggers
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticket_types_updated_at
BEFORE UPDATE ON ticket_types
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
BEFORE UPDATE ON tickets
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticket_transfers_updated_at
BEFORE UPDATE ON ticket_transfers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create a profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for creating a profile after signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to decrease ticket quantity when purchased
CREATE OR REPLACE FUNCTION public.decrease_ticket_quantity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE ticket_types
  SET remaining_quantity = remaining_quantity - NEW.quantity
  WHERE id = NEW.ticket_type_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to decrease ticket quantity when purchased
CREATE TRIGGER on_order_item_created
  AFTER INSERT ON order_items
  FOR EACH ROW EXECUTE FUNCTION public.decrease_ticket_quantity();
