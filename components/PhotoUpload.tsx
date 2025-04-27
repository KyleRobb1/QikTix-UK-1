"use client";

import { useState } from "react";
import { supabase } from "../src/lib/supabase";
import { useAuth } from "../src/context/AuthContext";
import Image from "next/image";

interface PhotoUploadProps {
  type: 'user' | 'event';
  id: string;
  onUpload?: (url: string) => void;
  initialUrl?: string;
}

export default function PhotoUpload({ type, id, onUpload, initialUrl }: PhotoUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setError(null);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${user.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setPhotoUrl(data.publicUrl);
      if (onUpload) onUpload(data.publicUrl);

      // Update Supabase DB with the new photo URL
      if (type === 'user') {
        await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);
      } else if (type === 'event') {
        await supabase.from('events').update({ photo_url: data.publicUrl }).eq('id', id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{type === 'user' ? 'Profile Photo' : 'Event Photo'}</label>
      {photoUrl && (
        <div className="mb-2">
          <Image src={photoUrl} alt="Uploaded" width={96} height={96} className="rounded-full object-cover" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {uploading && <p className="text-blue-500 text-xs mt-2">Uploading...</p>}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
