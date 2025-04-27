"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '../src/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupaPhotoProvider from '../src/components/SupaPhotoProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { useState } from 'react';

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 min-h-screen flex flex-col`}
    >
      <AuthProvider>
        <SupaPhotoProvider>
          <Header search={search} setSearch={setSearch} />
          {children}
          <Footer />
        </SupaPhotoProvider>
      </AuthProvider>
    </body>
  );
}
