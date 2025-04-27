"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAllPhotos } from '../lib/fetchPhotos';

const SupaPhotoContext = createContext<string[]>([]);

export function useSupaPhotos() {
  return useContext(SupaPhotoContext);
}

export default function SupaPhotoProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    fetchAllPhotos().then(fetched => {
      if (Array.isArray(fetched) && fetched.length > 0) {
        setPhotos(fetched);
      }
      // If no photos found, keep previous (fallback) images
    });
  }, []);

  return (
    <SupaPhotoContext.Provider value={photos}>
      {children}
    </SupaPhotoContext.Provider>
  );
}
