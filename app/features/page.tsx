"use client";


export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border-2 border-transparent bg-clip-padding card-gradient group transition-transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-yellow-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Platform Features</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" /></svg>
            <h3 className="font-bold text-lg mb-1">Mobile First</h3>
            <p>Our platform is fully responsive for seamless ticketing on any device.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v1.5a2.25 2.25 0 0 0 2.25 2.25h3A2.25 2.25 0 0 0 19.5 18.5V17m-15 0v1.5A2.25 2.25 0 0 0 6.75 20.75h3A2.25 2.25 0 0 0 12 18.5V17m0-10V6.75A2.25 2.25 0 0 0 9.75 4.5h-3A2.25 2.25 0 0 0 4.5 6.75V7m15 0v-.25A2.25 2.25 0 0 0 17.25 4.5h-3A2.25 2.25 0 0 0 12 6.75V7m0 10v-2.25m0 0a2.25 2.25 0 0 1-2.25-2.25V9.75A2.25 2.25 0 0 1 12 7.5m0 0a2.25 2.25 0 0 1 2.25 2.25v2.75A2.25 2.25 0 0 1 12 14.25z" /></svg>
            <h3 className="font-bold text-lg mb-1">Secure Payments</h3>
            <p>All transactions are encrypted and PCI-compliant.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
            <h3 className="font-bold text-lg mb-1">Easy Event Management</h3>
            <p>Create, edit, and track your events with a user-friendly dashboard.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5V6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v.75m-18 0v10.5A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25V7.5m-18 0l9 6.75L21 7.5" /></svg>
            <h3 className="font-bold text-lg mb-1">Photo Uploads</h3>
            <p>Add real event photos to attract more attendees.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 12.75l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0z" /></svg>
            <h3 className="font-bold text-lg mb-1">Analytics</h3>
            <p>Real-time ticket sales and attendance data.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 1 1 5.636 18.364 9 9 0 0 1 18.364 5.636z" /></svg>
            <h3 className="font-bold text-lg mb-1">Support</h3>
            <p>Friendly support for both organizers and attendees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
