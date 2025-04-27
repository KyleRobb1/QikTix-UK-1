const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          &copy; {currentYear} QikTix UK. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}
