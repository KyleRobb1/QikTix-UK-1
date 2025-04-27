'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  remainingQuantity: number;
}

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  eventId: string;
}

export default function TicketSelection({ ticketTypes, eventId }: TicketSelectionProps) {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleIncrement = (ticketId: string, remainingQuantity: number) => {
    setSelectedTickets((prev) => {
      const currentQuantity = prev[ticketId] || 0;
      if (currentQuantity < remainingQuantity && currentQuantity < 10) {
        return { ...prev, [ticketId]: currentQuantity + 1 };
      }
      return prev;
    });
  };

  const handleDecrement = (ticketId: string) => {
    setSelectedTickets((prev) => {
      const currentQuantity = prev[ticketId] || 0;
      if (currentQuantity > 0) {
        return { ...prev, [ticketId]: currentQuantity - 1 };
      }
      return prev;
    });
  };

  const getTotalQuantity = () => {
    return Object.values(selectedTickets).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return ticketTypes.reduce((sum, ticket) => {
      const quantity = selectedTickets[ticket.id] || 0;
      return sum + (ticket.price * quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to purchase tickets');
      router.push('/login');
      return;
    }

    if (getTotalQuantity() === 0) {
      toast.error('Please select at least one ticket');
      return;
    }

    setIsCheckingOut(true);
    
    // In a real app, this would send the order to Supabase and redirect to payment
    setTimeout(() => {
      router.push(`/checkout/${eventId}?tickets=${encodeURIComponent(JSON.stringify(selectedTickets))}`);
    }, 1000);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        {ticketTypes.map((ticket) => (
          <div key={ticket.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                <p className="text-sm text-gray-600">{ticket.description}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">£{ticket.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{ticket.remainingQuantity} remaining</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDecrement(ticket.id)}
                  disabled={!selectedTickets[ticket.id]}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedTickets[ticket.id] ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <FiMinus size={16} />
                </motion.button>
                <span className="w-8 text-center">{selectedTickets[ticket.id] || 0}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleIncrement(ticket.id, ticket.remainingQuantity)}
                  disabled={
                    (selectedTickets[ticket.id] || 0) >= ticket.remainingQuantity ||
                    (selectedTickets[ticket.id] || 0) >= 10
                  }
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    (selectedTickets[ticket.id] || 0) < ticket.remainingQuantity && (selectedTickets[ticket.id] || 0) < 10
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <FiPlus size={16} />
                </motion.button>
              </div>
              <div className="font-medium">
                £{((selectedTickets[ticket.id] || 0) * ticket.price).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">£{getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Booking Fee</span>
          <span className="font-medium">£{(getTotalPrice() * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>£{(getTotalPrice() * 1.05).toFixed(2)}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckout}
        disabled={isCheckingOut || getTotalQuantity() === 0}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-white font-medium ${
          isCheckingOut || getTotalQuantity() === 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <FiShoppingCart />
        <span>{isCheckingOut ? 'Processing...' : 'Checkout'}</span>
      </motion.button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        By purchasing tickets, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
