import MainLayout from '../../components/layout/MainLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import EventSearchFilter from '../../components/events/EventSearchFilter';

export default function EventsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and book tickets for the best events across the UK
          </p>
        </motion.div>

        <EventSearchFilter />

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="/images/event1.jpg"
                  alt="Summer Music Festival"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  FEATURED
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">SAT, JUN 15 • 12:00 PM</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Summer Music Festival 2025</h3>
                <p className="text-gray-600 mb-4">Hyde Park, London</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">From £45.00</span>
                  <Link
                    href="/events/summer-music-festival"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Event Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="/images/event2.jpg"
                  alt="Tech Conference"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">THU, MAY 22 • 9:00 AM</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Future Tech Conference</h3>
                <p className="text-gray-600 mb-4">ExCeL, London</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">From £120.00</span>
                  <Link
                    href="/events/future-tech-conference"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Event Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="/images/event3.jpg"
                  alt="Comedy Night"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">FRI, APR 18 • 8:00 PM</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Comedy Night Live</h3>
                <p className="text-gray-600 mb-4">O2 Arena, Manchester</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">From £35.00</span>
                  <Link
                    href="/events/comedy-night-live"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Event Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="/images/event4.jpg"
                  alt="Food Festival"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">SAT, JUL 8 • 11:00 AM</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Taste of London Food Festival</h3>
                <p className="text-gray-600 mb-4">Regent's Park, London</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">From £25.00</span>
                  <Link
                    href="/events/taste-of-london"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Event Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="/images/event5.jpg"
                  alt="Art Exhibition"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  ALMOST SOLD OUT
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">TUE, AUG 12 • 10:00 AM</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Modern Art Exhibition</h3>
                <p className="text-gray-600 mb-4">Tate Modern, London</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">From £18.00</span>
                  <Link
                    href="/events/modern-art-exhibition"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Event Card 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="/images/event6.jpg"
                  alt="Theatre Show"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">SAT, SEP 5 • 7:30 PM</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Hamilton: The Musical</h3>
                <p className="text-gray-600 mb-4">Victoria Palace Theatre, London</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">From £75.00</span>
                  <Link
                    href="/events/hamilton-musical"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-blue-600 text-white"
              >
                1
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
