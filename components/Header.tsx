"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../src/context/AuthContext';

interface HeaderProps {
  userPhoto?: string;
}

export default function Header({ userPhoto }: HeaderProps) {
  const { user, signOut } = useAuth();
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600">QikTix</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/events" className="hover:text-blue-600">Events</Link>
        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-blue-600 flex items-center gap-2">
              {userPhoto ? (
                <Image src={userPhoto} alt="Profile" width={32} height={32} className="rounded-full object-cover" />
              ) : (
                <span className="inline-block w-8 h-8 rounded-full bg-gray-200" />
              )}
              Dashboard
            </Link>
            <button onClick={signOut} className="text-red-500 hover:underline">Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
            <Link href="/signup" className="hover:text-blue-600">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
