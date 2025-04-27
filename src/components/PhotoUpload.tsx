"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
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
        await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', id);
      } else if (type === 'event') {
        await supabase.from('events').update({ photo_url: data.publicUrl }).eq('id', id);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {photoUrl && (
        <Image src={photoUrl} alt="Profile Photo" width={80} height={80} className="rounded-full border" />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <span className="text-blue-600">Uploading...</span>}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
