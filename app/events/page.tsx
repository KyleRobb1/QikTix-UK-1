import Header from '@/components/Header';

import Link from 'next/link';
import Image from 'next/image';

const demoEvents = [
  {
    slug: 'summer-music-festival',
    title: 'Summer Music Festival 2025',
    photo_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'london-food-fair',
    title: 'London Food Fair',
    photo_url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'art-expo',
    title: 'Contemporary Art Expo',
    photo_url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {demoEvents.map(event => (
            <div key={event.slug} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <Image src={event.photo_url} alt={event.title} width={400} height={250} className="object-cover w-full h-48" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
                <Link href={`/events/${event.slug}`} className="text-blue-600 hover:underline mt-auto">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

