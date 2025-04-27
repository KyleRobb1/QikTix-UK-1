'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiClock, FiCreditCard, FiShield } from 'react-icons/fi';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CheckoutPageProps {
  params: {
    eventId: string;
  };
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { eventId } = params;
  const searchParams = useSearchParams();
  const ticketsParam = searchParams.get('tickets');
  const router = useRouter();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      toast.error('Please log in to complete your purchase');
      router.push('/login');
      return;
    }

    // Parse selected tickets from URL
    if (ticketsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(ticketsParam));
        setSelectedTickets(parsed);
      } catch (error) {
        console.error('Error parsing tickets:', error);
        toast.error('Invalid ticket selection');
        router.push(`/events/${eventId}`);
        return;
      }
    } else {
      toast.error('No tickets selected');
      router.push(`/events/${eventId}`);
      return;
    }

    // In a real app, fetch event and ticket details from Supabase
    // For this demo, we'll use mock data
    const fetchEventData = async () => {
      setIsLoading(true);
      
      // Mock data - in a real app, this would be fetched from Supabase
      const mockEvent = {
        id: eventId,
        title: 'Summer Music Festival 2025',
        venue: 'Hyde Park',
        address: 'Hyde Park, London W2 2UH',
        city: 'London',
        startDate: '2025-06-15T12:00:00',
        endDate: '2025-06-17T23:00:00',
        bannerImage: '/images/event1.jpg',
      };
      
      const mockTicketTypes = [
        {
          id: '1',
          name: 'General Admission',
          description: 'Access to all main stages and general festival areas',
          price: 45.00,
        },
        {
          id: '2',
          name: 'VIP Pass',
          description: 'VIP lounge access, premium viewing areas, complimentary drinks',
          price: 120.00,
        },
        {
          id: '3',
          name: 'Weekend Pass',
          description: 'Full 3-day access to all festival areas',
          price: 110.00,
        }
      ];
      
      setEvent(mockEvent);
      setTicketTypes(mockTicketTypes);
      setIsLoading(false);
    };
    
    fetchEventData();
  }, [eventId, ticketsParam, user, router]);

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

  const getSubtotal = () => {
    return ticketTypes.reduce((sum, ticket) => {
      const quantity = selectedTickets[ticket.id] || 0;
      return sum + (ticket.price * quantity);
    }, 0);
  };

  const getBookingFee = () => {
    return getSubtotal() * 0.05;
  };

  const getTotal = () => {
    return getSubtotal() + getBookingFee();
  };

  const handlePayPalApprove = async (data: any, actions: any): Promise<void> => {
    try {
      // Capture the funds from the transaction
      const details = await actions.order.capture();
      
      // In a real app, save the order to Supabase
      // For this demo, we'll simulate it with a timeout
      
      // Create an order ID
      const mockOrderId = `ORDER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      toast.success('Payment successful! Processing your tickets...');
      
      // Simulate saving to database
      setTimeout(() => {
        setOrderId(mockOrderId);
        setOrderComplete(true);
        toast.success('Your tickets have been confirmed!');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
    // No return value (void)
  };

  const createPayPalOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: getTotal().toFixed(2),
            currency_code: 'GBP',
            breakdown: {
              item_total: {
                value: getSubtotal().toFixed(2),
                currency_code: 'GBP',
              },
              handling: {
                value: getBookingFee().toFixed(2),
                currency_code: 'GBP',
              },
            },
          },
          description: `Tickets for ${event?.title}`,
          items: ticketTypes
            .filter(ticket => selectedTickets[ticket.id] > 0)
            .map(ticket => ({
              name: ticket.name,
              unit_amount: {
                value: ticket.price.toFixed(2),
                currency_code: 'GBP',
              },
              quantity: selectedTickets[ticket.id].toString(),
              description: ticket.description,
            })),
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  if (isLoading || !event) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (orderComplete) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your tickets have been confirmed and will be emailed to you shortly.
            </p>
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <p className="text-gray-700">Order Reference: <span className="font-semibold">{orderId}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/tickets')}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                View My Tickets
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/events')}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
              >
                Browse More Events
              </motion.button>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your ticket purchase for {event.title}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="flex items-center mb-6">
                <div className="relative w-20 h-20 rounded-md overflow-hidden mr-4">
                  <Image
                    src={event.bannerImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <div className="text-sm text-gray-600 flex items-center mt-1">
                    <FiCalendar className="mr-1" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center mt-1">
                    <FiMapPin className="mr-1" />
                    <span>{event.venue}, {event.city}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3">Tickets</h3>
                <div className="space-y-3 mb-6">
                  {ticketTypes.map(ticket => {
                    const quantity = selectedTickets[ticket.id] || 0;
                    if (quantity === 0) return null;
                    
                    return (
                      <div key={ticket.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{ticket.name}</span>
                          <span className="text-gray-600 ml-2">x{quantity}</span>
                        </div>
                        <div className="font-medium">
                          £{(ticket.price * quantity).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">£{getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Booking Fee</span>
                    <span className="font-medium">£{getBookingFee().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>£{getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <FiShield className="text-green-600 mr-2" />
                <h3 className="font-semibold">Secure Checkout</h3>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <PayPalScriptProvider options={{ 
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", 
                    currency: "GBP" 
                  }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createPayPalOrder}
                      onApprove={handlePayPalApprove}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                By completing this purchase, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </div>
            </motion.div>
          </div>
          
          {/* Order Details */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Event</h3>
                  <p className="font-medium">{event.title}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="font-medium">{formatDate(event.startDate)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Venue</h3>
                  <p className="font-medium">{event.venue}</p>
                  <p className="text-sm text-gray-600">{event.address}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Method</h3>
                  <p className="font-medium">E-Tickets</p>
                  <p className="text-sm text-gray-600">Sent to your email after purchase</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Need Help?</h3>
                <Link href="/contact" className="text-blue-600 hover:underline text-sm">Contact Support</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
