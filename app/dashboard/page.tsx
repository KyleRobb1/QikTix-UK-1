"use client";

import Header from '@/components/Header';
import PhotoUpload from '@/components/PhotoUpload';
import { useAuth } from '../../src/context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabase';

export default function DashboardPage() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).single();
      if (data && data.avatar_url) setAvatarUrl(data.avatar_url);
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  return (
    <>
      <Header userPhoto={avatarUrl || undefined} />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user && !loading && (
          <PhotoUpload type="user" id={user.id} initialUrl={avatarUrl || undefined} onUpload={setAvatarUrl} />
        )}
        <p className="text-gray-700 mb-2">This is a placeholder for the Dashboard page.</p>
        <p className="text-gray-500">Implement your dashboard content here.</p>
      </div>
    </>
  );
}
