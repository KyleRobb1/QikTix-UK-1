import MainLayout from '../src/components/layout/MainLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiCreditCard, FiSmartphone, FiSearch } from 'react-icons/fi';

export default function Home() {
  return (
    <MainLayout>
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/images/hero-image.jpg"
                alt="Event ticketing platform"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose QikTix UK?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our modern platform makes event ticketing seamless for both organizers and attendees.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <FiSearch size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Event Discovery</h3>
              <p className="text-gray-600">
                Find events by location, date, category, or popularity with our powerful search tools.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <FiCreditCard size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Payments</h3>
              <p className="text-gray-600">
                Purchase tickets with confidence using our secure PayPal integration.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <FiSmartphone size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mobile E-Tickets</h3>
              <p className="text-gray-600">
                Access your tickets anytime with QR code-based digital tickets for easy entry.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <FiCalendar size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Event Management</h3>
              <p className="text-gray-600">
                Create, edit, and publish events with our comprehensive organizer tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900"
            >
              Popular Events
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/events"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                View All Events
              </Link>
            </motion.div>
          </div>

          {/* Event Cards - In a real app, these would be dynamically populated */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Host Your Event?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Create and manage your events with our powerful organizer tools. Get started today!
              </p>
              <Link
                href="/organizers/signup"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-block"
              >
                Become an Organizer
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[350px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/images/organizer-dashboard.jpg"
                alt="Organizer Dashboard"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from event organizers and attendees who use QikTix UK.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/testimonial1.jpg"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Event Organizer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "QikTix UK has transformed how I manage my events. The analytics dashboard gives me real-time insights, and the ticket management system is incredibly intuitive."
              </p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/testimonial2.jpg"
                    alt="David Chen"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">David Chen</h4>
                  <p className="text-gray-600 text-sm">Regular Attendee</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I love how easy it is to find and book tickets on QikTix UK. The mobile tickets with QR codes make entry a breeze, and transferring tickets to friends is so simple!"
              </p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/testimonial3.jpg"
                    alt="Emma Williams"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emma Williams</h4>
                  <p className="text-gray-600 text-sm">Festival Director</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The seating map feature has been a game-changer for our venue events. Our customers love being able to choose their exact seats, and it's increased our conversion rates."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
