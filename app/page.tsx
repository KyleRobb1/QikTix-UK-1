"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiCreditCard, FiSmartphone, FiSearch } from 'react-icons/fi';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                QikTix UK – The Smarter Way to Ticket
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover, book, and manage tickets for the best events across the UK with our modern ticketing platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/events"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Find Events
                </Link>
                <Link
                  href="/organizers"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Create Event
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ...rest of your content... */}
    </div>
  );
}
