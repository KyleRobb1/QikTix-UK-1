'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiClock, FiTicket, FiUser, FiSettings, FiCreditCard, FiLogOut } from 'react-icons/fi';
import { Tab } from '@headlessui/react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      toast.error('Please log in to view your dashboard');
      router.push('/login');
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, fetch from Supabase
        // For this demo, we'll use mock data
        
        // Mock profile data
        const mockProfile = {
          id: user.id,
          fullName: 'John Smith',
          email: user.email,
          phoneNumber: '+44 7700 900123',
          avatarUrl: '/images/avatar.jpg',
        };
        
        // Mock tickets data
        const mockTickets = [
          {
            id: '1',
            eventId: '1',
            eventTitle: 'Summer Music Festival 2025',
            eventDate: '2025-06-15T12:00:00',
            venue: 'Hyde Park, London',
            ticketType: 'VIP Pass',
            price: 120.00,
            purchaseDate: '2025-04-15T14:30:00',
            qrCode: 'TICKET-ABC123',
            isUsed: false,
          },
          {
            id: '2',
            eventId: '2',
            eventTitle: 'Future Tech Conference',
            eventDate: '2025-05-22T09:00:00',
            venue: 'ExCeL, London',
            ticketType: 'General Admission',
            price: 45.00,
            purchaseDate: '2025-04-10T11:15:00',
            qrCode: 'TICKET-DEF456',
            isUsed: false,
          }
        ];
        
        // Mock upcoming events (for organizers)
        const mockUpcomingEvents = [
          {
            id: '3',
            title: 'Charity Gala Dinner',
            date: '2025-07-10T19:00:00',
            venue: 'The Ritz, London',
            ticketsSold: 78,
            totalCapacity: 150,
            revenue: 7800.00,
            status: 'published',
            bannerImage: '/images/event4.jpg',
          }
        ];
        
        // Mock past events (for organizers)
        const mockPastEvents = [
          {
            id: '4',
            title: 'Business Networking Lunch',
            date: '2025-03-15T12:30:00',
            venue: 'The Shard, London',
            ticketsSold: 45,
            totalCapacity: 50,
            revenue: 2250.00,
            status: 'completed',
            bannerImage: '/images/event5.jpg',
          }
        ];
        
        setProfile(mockProfile);
        setTickets(mockTickets);
        setUpcomingEvents(mockUpcomingEvents);
        setPastEvents(mockPastEvents);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load your data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading || !user) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={profile?.avatarUrl || '/images/avatar-placeholder.jpg'}
                    alt={profile?.fullName || user.email || 'User'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{profile?.fullName || 'User'}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-600 rounded-md font-medium">
                  <FiUser />
                  <span>Dashboard</span>
                </Link>
                <Link href="/tickets" className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-md">
                  <FiTicket />
                  <span>My Tickets</span>
                </Link>
                <Link href="/dashboard/events" className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-md">
                  <FiCalendar />
                  <span>My Events</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-md">
                  <FiSettings />
                  <span>Account Settings</span>
                </Link>
                <Link href="/dashboard/payments" className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-md">
                  <FiCreditCard />
                  <span>Payment Methods</span>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  <FiLogOut />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
            
            <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Become an Organizer</h3>
              <p className="text-blue-100 text-sm mb-4">
                Create and manage your own events on QikTix UK
              </p>
              <Link href="/organizers/apply" className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium inline-block hover:bg-blue-50">
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold mb-6">Welcome back, {profile?.fullName?.split(' ')[0] || 'there'}!</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-blue-600 font-semibold mb-1">Upcoming Events</div>
                  <div className="text-2xl font-bold">{tickets.length}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-green-600 font-semibold mb-1">Active Tickets</div>
                  <div className="text-2xl font-bold">{tickets.filter(t => !t.isUsed).length}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-purple-600 font-semibold mb-1">Events Organized</div>
                  <div className="text-2xl font-bold">{upcomingEvents.length + pastEvents.length}</div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Upcoming Tickets</h2>
                {tickets.length > 0 ? (
                  <div className="space-y-4">
                    {tickets.map(ticket => (
                      <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{ticket.eventTitle}</h3>
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                              <FiCalendar className="mr-1" />
                              <span>{formatDate(ticket.eventDate)}</span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                              <FiMapPin className="mr-1" />
                              <span>{ticket.venue}</span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                              <FiTicket className="mr-1" />
                              <span>{ticket.ticketType}</span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <Link 
                              href={`/tickets/${ticket.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              View Ticket
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <div className="text-gray-500 mb-4">You don't have any upcoming tickets</div>
                    <Link 
                      href="/events"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Browse Events
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Organizer Section */}
            {(upcomingEvents.length > 0 || pastEvents.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Your Events</h2>
                
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-50 p-1 mb-6">
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                        ${
                          selected
                            ? 'bg-white text-blue-600 shadow'
                            : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                        }`
                      }
                    >
                      Upcoming
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                        ${
                          selected
                            ? 'bg-white text-blue-600 shadow'
                            : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                        }`
                      }
                    >
                      Past
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      {upcomingEvents.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingEvents.map(event => (
                            <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <div className="flex flex-col md:flex-row">
                                <div className="relative md:w-48 h-32 md:h-auto">
                                  <Image
                                    src={event.bannerImage}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-4 flex-1">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                      <h3 className="font-semibold text-lg">{event.title}</h3>
                                      <div className="text-sm text-gray-600 flex items-center mt-1">
                                        <FiCalendar className="mr-1" />
                                        <span>{formatDate(event.date)}</span>
                                      </div>
                                      <div className="text-sm text-gray-600 flex items-center mt-1">
                                        <FiMapPin className="mr-1" />
                                        <span>{event.venue}</span>
                                      </div>
                                      <div className="mt-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                      <div className="text-sm text-gray-600 mb-1">Tickets Sold</div>
                                      <div className="font-semibold">{event.ticketsSold}/{event.totalCapacity}</div>
                                      <div className="text-sm text-gray-600 mt-2">Revenue</div>
                                      <div className="font-semibold">£{event.revenue.toFixed(2)}</div>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <Link 
                                      href={`/dashboard/events/${event.id}`}
                                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                      Manage Event
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                          <div className="text-gray-500 mb-4">You don't have any upcoming events</div>
                          <Link 
                            href="/dashboard/events/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Create Event
                          </Link>
                        </div>
                      )}
                    </Tab.Panel>
                    <Tab.Panel>
                      {pastEvents.length > 0 ? (
                        <div className="space-y-4">
                          {pastEvents.map(event => (
                            <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <div className="flex flex-col md:flex-row">
                                <div className="relative md:w-48 h-32 md:h-auto">
                                  <Image
                                    src={event.bannerImage}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-4 flex-1">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                      <h3 className="font-semibold text-lg">{event.title}</h3>
                                      <div className="text-sm text-gray-600 flex items-center mt-1">
                                        <FiCalendar className="mr-1" />
                                        <span>{formatDate(event.date)}</span>
                                      </div>
                                      <div className="text-sm text-gray-600 flex items-center mt-1">
                                        <FiMapPin className="mr-1" />
                                        <span>{event.venue}</span>
                                      </div>
                                      <div className="mt-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                      <div className="text-sm text-gray-600 mb-1">Tickets Sold</div>
                                      <div className="font-semibold">{event.ticketsSold}/{event.totalCapacity}</div>
                                      <div className="text-sm text-gray-600 mt-2">Revenue</div>
                                      <div className="font-semibold">£{event.revenue.toFixed(2)}</div>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <Link 
                                      href={`/dashboard/events/${event.id}/analytics`}
                                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                                    >
                                      View Analytics
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                          <div className="text-gray-500">You don't have any past events</div>
                        </div>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
