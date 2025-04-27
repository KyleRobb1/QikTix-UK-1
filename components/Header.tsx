"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../src/context/AuthContext';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  userPhoto?: string;
}

import { useState } from 'react';

export default function Header({ userPhoto }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home', exact: true },
    { href: '/events', label: 'Events' },
    { href: '/organisers', label: 'For Organisers' },
    { href: '/features', label: 'Features' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600">QikTix</span>
      </Link>
      <nav className="flex items-center gap-6">
        {navLinks.map(({ href, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href) && href !== '/';
          return (
            <Link
              key={href}
              href={href}
              className={
                (isActive
                  ? 'text-blue-700 font-bold underline underline-offset-4'
                  : 'hover:text-blue-600')
              }
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}
        {user ? (
          <>
            <Link href="/dashboard" className={pathname.startsWith('/dashboard') ? 'text-blue-700 font-bold underline underline-offset-4 flex items-center gap-2' : 'hover:text-blue-600 flex items-center gap-2'}>
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
          <div className="relative">
            <button
              type="button"
              className="hover:text-blue-600 flex items-center gap-1 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen ? "true" : "false"}
            >
              Account
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                <Link
                  href="/login"
                  className={`block px-4 py-2 text-sm ${pathname.startsWith('/login') ? 'text-blue-700 font-bold underline underline-offset-4' : 'hover:bg-blue-50 hover:text-blue-700'}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`block px-4 py-2 text-sm ${pathname.startsWith('/signup') ? 'text-blue-700 font-bold underline underline-offset-4' : 'hover:bg-blue-50 hover:text-blue-700'}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/account"
                  className={`block px-4 py-2 text-sm ${pathname.startsWith('/account') ? 'text-blue-700 font-bold underline underline-offset-4' : 'hover:bg-blue-50 hover:text-blue-700'}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Account
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
