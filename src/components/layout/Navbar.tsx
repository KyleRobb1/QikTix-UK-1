"use client";

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiCalendar, FiTag } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.svg" 
              alt="QikTix UK Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-blue-600">QikTix UK</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/events" className="text-gray-700 hover:text-blue-600 transition-colors">
            Events
          </Link>
          <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="/organizers" className="text-gray-700 hover:text-blue-600 transition-colors">
            For Organizers
          </Link>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FiUser />
                <span>My Account</span>
              </button>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 flex items-center">
                      <FiCalendar className="mr-2" /> My Events
                    </Link>
                    <Link href="/tickets" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 flex items-center">
                      <FiTag className="mr-2" /> My Tickets
                    </Link>
                    <button 
                      onClick={handleSignOut} 
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 px-4 py-2">
              <Link 
                href="/events" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/organizers" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Organizers
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiCalendar className="mr-2" /> My Events
                  </Link>
                  <Link 
                    href="/tickets" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiTag className="mr-2" /> My Tickets
                  </Link>
                  <button 
                    onClick={handleSignOut} 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link 
                    href="/login" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
