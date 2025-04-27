"use client";

export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border-2 border-transparent bg-clip-padding card-gradient group transition-transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-purple-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 19.5a7.5 7.5 0 0 1 15 0v.75A2.25 2.25 0 0 1 17.25 22.5h-10.5A2.25 2.25 0 0 1 4.5 20.25v-.75z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Account</h1>
        <p>Welcome to your account page. Here you can manage your profile, view orders, and update your details. (Expand this page as needed!)</p>
      </div>
    </div>
  );
}
