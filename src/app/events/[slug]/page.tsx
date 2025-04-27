import MainLayout from '../../../components/layout/MainLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiClock, FiTag, FiShare2, FiHeart } from 'react-icons/fi';
import TicketSelection from '../../../components/events/TicketSelection';

// In a real app, this would fetch data from Supabase based on the slug
export default function EventDetailPage({ params }: { params: { slug: string } }) {
  // Mock event data - in a real app, this would be fetched from Supabase
  const event = {
    id: '1',
    title: 'Summer Music Festival 2025',
    description: 'Join us for the biggest music festival of the summer featuring top artists from around the world. Experience three days of amazing performances across five stages, delicious food vendors, art installations, and more!',
    venue: 'Hyde Park',
    address: 'Hyde Park, London W2 2UH',
    city: 'London',
    startDate: '2025-06-15T12:00:00',
    endDate: '2025-06-17T23:00:00',
    bannerImage: '/images/event1.jpg',
    category: 'Music',
    organizer: {
      id: '1',
      name: 'Festival Productions Ltd',
      logo: '/images/organizer1.jpg'
    },
    ticketTypes: [
      {
        id: '1',
        name: 'General Admission',
        description: 'Access to all main stages and general festival areas',
        price: 45.00,
        remainingQuantity: 500
      },
      {
        id: '2',
        name: 'VIP Pass',
        description: 'VIP lounge access, premium viewing areas, complimentary drinks',
        price: 120.00,
        remainingQuantity: 100
      },
      {
        id: '3',
        name: 'Weekend Pass',
        description: 'Full 3-day access to all festival areas',
        price: 110.00,
        remainingQuantity: 300
      }
    ],
    schedule: [
      {
        day: 'Day 1 - Saturday',
        items: [
          { time: '12:00 PM', description: 'Gates Open' },
          { time: '1:00 PM', description: 'Opening Act - The Soundwaves' },
          { time: '3:00 PM', description: 'DJ Pulse Set' },
          { time: '5:00 PM', description: 'Indie Rockers - Main Stage' },
          { time: '7:00 PM', description: 'Headliner - Electric Dreams' }
        ]
      },
      {
        day: 'Day 2 - Sunday',
        items: [
          { time: '12:00 PM', description: 'Gates Open' },
          { time: '1:00 PM', description: 'Acoustic Session - The Harmonies' },
          { time: '3:00 PM', description: 'Pop Sensations - Melody Makers' },
          { time: '5:00 PM', description: 'International Guest - Tokyo Beats' },
          { time: '7:00 PM', description: 'Headliner - The Anthems' }
        ]
      }
    ],
    faqs: [
      {
        question: 'What items are prohibited?',
        answer: 'Glass containers, outside alcohol, illegal substances, weapons, professional cameras, and drones are not permitted at the festival.'
      },
      {
        question: 'Is there parking available?',
        answer: 'Limited parking is available near the venue. We recommend using public transportation or rideshare services.'
      },
      {
        question: 'What happens if it rains?',
        answer: 'The festival will proceed rain or shine. Please check weather forecasts and dress accordingly.'
      },
      {
        question: 'Are there age restrictions?',
        answer: 'The festival is open to all ages. Children under 12 must be accompanied by an adult.'
      }
    ]
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

  return (
    <MainLayout>
      <div className="bg-gray-50 pb-12">
        {/* Event Banner */}
        <div className="relative h-80 md:h-96 w-full">
          <Image
            src={event.bannerImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 text-sm mb-2">
                <FiCalendar className="text-blue-300" />
                <span>{formatDate(event.startDate)}</span>
                <span className="mx-2">•</span>
                <FiMapPin className="text-blue-300" />
                <span>{event.venue}, {event.city}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
              <div className="flex items-center mt-4 space-x-4">
                <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors">
                  <FiShare2 />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors">
                  <FiHeart />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                  <FiTag />
                  <span>{event.category}</span>
                  <span className="mx-2">•</span>
                  <FiClock />
                  <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                </div>
                <p className="text-gray-700 mb-6">{event.description}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Organizer</h3>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={event.organizer.logo}
                        alt={event.organizer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{event.organizer.name}</p>
                      <Link href={`/organizers/${event.organizer.id}`} className="text-sm text-blue-600 hover:text-blue-700">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
                <div className="space-y-6">
                  {event.schedule.map((day, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-3">{day.day}</h3>
                      <div className="space-y-3">
                        {day.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex">
                            <div className="w-24 font-medium text-gray-900">{item.time}</div>
                            <div className="flex-1 text-gray-700">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="mb-4">
                  <p className="text-gray-700">{event.venue}</p>
                  <p className="text-gray-700">{event.address}</p>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/images/map.jpg"
                    alt="Event location map"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {event.faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Ticket Selection Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold mb-6">Get Tickets</h2>
                <TicketSelection ticketTypes={event.ticketTypes} eventId={event.id} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
