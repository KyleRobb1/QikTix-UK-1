"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface HeaderProps {
  userPhoto?: string;
  search?: string;
  setSearch?: (s: string) => void;
}

export default function Header({ userPhoto, search = '', setSearch }: HeaderProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="text-xl font-bold text-blue-600">QikTix</span>
          </Link>
          {/* Always show search bar */}
          <input
            type="text"
            placeholder="Search events..."
            className="ml-4 px-4 py-2 border-4 border-red-600 rounded-md focus:outline-none focus:ring-4 focus:ring-yellow-400 text-base w-96"
            value={search || ''}
            onChange={e => setSearch ? setSearch(e.target.value) : undefined}
            readOnly={!setSearch}
            style={{ backgroundColor: 'yellow', color: 'black', fontWeight: 'bold', cursor: setSearch ? 'text' : 'not-allowed' }}
          />
          {userPhoto && (
            <Image
              src={userPhoto}
              alt="User Photo"
              width={40}
              height={40}
              className="rounded-full border border-gray-300"
            />
          )}
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/events" className="hover:text-blue-600">Events</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <button
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => { signOut(); router.push("/"); }}
              >Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600">Login</Link>
              <Link href="/signup" className="hover:text-blue-600">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
