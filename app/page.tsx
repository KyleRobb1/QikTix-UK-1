"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { FiCalendar, FiCreditCard, FiSmartphone, FiSearch } from 'react-icons/fi';

export default function Home() {
  const unsplashFallback = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
  ];
  // Curated, vibrant Pexels images for event/ticketing context
  const pexelsFallback = [
    {
      url: 'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg?auto=compress&w=1600&q=80',
      alt: 'Crowd cheering at concert',
    },
    {
      url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&w=1600&q=80',
      alt: 'Excited fans at a sports event',
    },
    {
      url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&w=1600&q=80',
      alt: 'Theatre stage with dramatic lighting',
    },
    {
      url: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&w=1600&q=80',
      alt: 'Cityscape at night with festival lights',
    },
    {
      url: 'https://images.pexels.com/photos/1679826/pexels-photo-1679826.jpeg?auto=compress&w=1600&q=80',
      alt: 'People celebrating at outdoor event',
    },
    {
      url: 'https://images.pexels.com/photos/1679827/pexels-photo-1679827.jpeg?auto=compress&w=1600&q=80',
      alt: 'Crowd at music festival with confetti',
    },
    {
      url: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&w=1600&q=80',
      alt: 'Stadium packed with fans',
    },
    {
      url: 'https://images.pexels.com/photos/1679828/pexels-photo-1679828.jpeg?auto=compress&w=1600&q=80',
      alt: 'Friends enjoying a celebration',
    },
  ];
  // Only use curated Pexels images for all homepage images
  const photos: { url: string; alt: string }[] = pexelsFallback.slice(0, 4);
  if (typeof window !== 'undefined') {
    console.log('Rendering event photos:', photos);
  }


  const [search, setSearch] = useState('');

  return (
    <div>
              {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center overflow-hidden">
        {photos[0] ? (
          <Image
            src={photos[0].url}
            alt={photos[0].alt}
            fill
            priority
            className="object-cover w-full h-full absolute inset-0 z-0"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl absolute inset-0 z-0">
            No event photos available. Upload some in your Supabase bucket!
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg"
          >
            Experience Live Events Like Never Before
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-xl md:text-2xl mb-8 text-gray-100 font-medium drop-shadow"
          >
            Dive into the energy of the crowd. Discover, book, and manage tickets for unforgettable UK events.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/events"
              className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors text-center shadow"
            >
              Find Events
            </Link>
            <Link
              href="/organisers"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors text-center shadow"
            >
              Create Event
            </Link>
          </div>
        </div>
      </section>
      {/* Events Grid Section */}
      {photos.length > 1 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.slice(1)
                .filter(photo => photo.alt.toLowerCase().includes(search.toLowerCase()))
                .map((photo, idx) => (
                  <div key={photo.url} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image src={photo.url} alt={photo.alt} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Event Date</div>
                      <h3 className="text-xl font-bold mb-2">Event Title</h3>
                      <Link href="/events" className="text-blue-600 hover:underline font-medium">View Details</Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why QikTix?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
              <FiSmartphone className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
              <p className="text-gray-700 text-center">Book and manage your tickets on the go with our responsive, mobile-first platform.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
              <FiCreditCard className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-700 text-center">All transactions are encrypted and processed securely for your peace of mind.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
              <FiSearch className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
              <p className="text-gray-700 text-center">Find the best events in your city with our powerful search and filtering tools.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">What Organizers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/testimonial1.jpg" alt="Jane Smith" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Jane Smith</h4>
                  <p className="text-gray-600 text-sm">Event Organizer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "QikTix made selling tickets for our charity gala effortless. The real-time analytics and easy payouts were a game changer."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/testimonial2.jpg" alt="John Doe" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Doe</h4>
                  <p className="text-gray-600 text-sm">Music Festival Promoter</p>
                </div>
              </div>
              <p className="text-gray-700">
                "We sold out our summer festival in record time thanks to QikTix's seamless platform and excellent customer support!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

