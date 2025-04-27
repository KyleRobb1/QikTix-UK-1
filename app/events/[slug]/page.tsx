import Header from '@/components/Header';
import PhotoUpload from '../../../src/components/PhotoUpload';
import { useAuth } from '../../../src/context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../../src/lib/supabase';
import Image from 'next/image';

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const { user } = useAuth();
  const [eventId, setEventId] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('events').select('id, photo_url').eq('slug', params.slug).single();
      if (data) {
        setEventId(data.id);
        setPhotoUrl(data.photo_url || null);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [params.slug]);

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Event: {params.slug}</h1>
        {photoUrl && (
          <Image src={photoUrl} alt="Event Photo" width={400} height={250} className="rounded mb-4 object-cover" />
        )}
        {user && eventId && !loading && (
          <PhotoUpload type="event" id={eventId} initialUrl={photoUrl || undefined} onUpload={setPhotoUrl} />
        )}
        <p className="text-gray-700 mb-2">This is a placeholder for the Event Detail page.</p>
        <p className="text-gray-500">Show event details here.</p>
      </div>
    </>
  );
}
