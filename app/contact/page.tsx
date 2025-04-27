export default function ContactPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border-2 border-transparent bg-clip-padding card-gradient group transition-transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-.684 1.607l-7.5 7.5a2.25 2.25 0 0 1-3.182 0l-7.5-7.5A2.25 2.25 0 0 1 2.25 6.993V6.75" />
          </svg>
        </div>
          <h1 className="text-3xl font-bold mb-8 text-blue-700">Contact Us</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input id="name" name="name" type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input id="email" name="email" type="email" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea id="message" name="message" className="w-full border rounded px-3 py-2" rows={5} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
