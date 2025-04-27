"use client";

import Link from 'next/link';

export default function OrganisersPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border-2 border-transparent bg-clip-padding card-gradient group transition-transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2a3 3 0 0 0-5.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2a3 3 0 0 1 5.356-1.857M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm8 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-8 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-blue-700">For Organisers</h1>
        <p className="mb-6 text-lg">QikTix makes it easy for event organisers to sell tickets, manage attendees, and grow their events.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-8">
          <div className="bg-green-50 rounded-lg p-5 flex items-center gap-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
            <span>Simple event creation and management dashboard</span>
          </div>
          <div className="bg-green-50 rounded-lg p-5 flex items-center gap-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 0 0-10 0v2m10 0a5 5 0 0 1-10 0m10 0v5a2 2 0 0 1-2 2m-6 0a2 2 0 0 1-2-2V9m0 0h10" /></svg>
            <span>Secure, fast payouts</span>
          </div>
          <div className="bg-green-50 rounded-lg p-5 flex items-center gap-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5V6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v.75m-18 0v10.5A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25V7.5m-18 0l9 6.75L21 7.5" /></svg>
            <span>Real-time analytics and reporting</span>
          </div>
          <div className="bg-green-50 rounded-lg p-5 flex items-center gap-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm8 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-8 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
            <span>Photo and media uploads for event promotion</span>
          </div>
          <div className="bg-green-50 rounded-lg p-5 flex items-center gap-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 1 1 5.636 18.364 9 9 0 0 1 18.364 5.636z" /></svg>
            <span>Dedicated support for organisers</span>
          </div>
        </div>
        <Link href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">Get Started</Link>
      </div>
    </div>
  );
}
