import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12 pt-12 pb-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Luxury Rental Houses</h3>
          <p className="text-gray-400 mb-4">Discover the world’s most exclusive homes and unique stays. Book your next unforgettable experience with us.</p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-pink-400" aria-label="Instagram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0120.5 7.75v8.5a4.25 4.25 0 01-4.25 4.25h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5zm8.25 2.25a.75.75 0 100 1.5.75.75 0 000-1.5zM12 7.25A4.75 4.75 0 1016.75 12 4.75 4.75 0 0012 7.25zm0 1.5A3.25 3.25 0 1115.25 12 3.25 3.25 0 0112 8.75z" /></svg></a>
            <a href="#" className="hover:text-blue-400" aria-label="Twitter"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.633 7.997c.013.176.013.353.013.53 0 5.39-4.104 11.61-11.61 11.61-2.307 0-4.453-.676-6.26-1.84.32.038.637.05.97.05 1.92 0 3.687-.652 5.096-1.747-1.797-.037-3.317-1.22-3.843-2.85.25.037.5.062.765.062.37 0 .74-.05 1.085-.144-1.87-.377-3.28-2.03-3.28-4.016v-.05c.55.305 1.18.49 1.85.514a4.07 4.07 0 01-1.81-3.39c0-.75.2-1.45.55-2.05a11.62 11.62 0 008.42 4.27c-.07-.3-.11-.61-.11-.93a4.07 4.07 0 014.07-4.07c1.17 0 2.23.49 2.97 1.28a8.1 8.1 0 002.58-.98 4.07 4.07 0 01-1.79 2.25 8.13 8.13 0 002.34-.64 8.7 8.7 0 01-2.04 2.11z" /></svg></a>
            <a href="#" className="hover:text-blue-600" aria-label="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg></a>
          </div>
        </div>
        {/* Navigation */}
        <div>
          <h4 className="text-md font-bold mb-3 text-white">Navigation</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/account/places" className="hover:text-primary">Accommodations</Link></li>
            <li><Link to="/account/bookings" className="hover:text-primary">Bookings</Link></li>
            <li><Link to="/account" className="hover:text-primary">Profile</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-md font-bold mb-3 text-white">Contact</h4>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:info@luxuryrentals.com" className="hover:text-primary">info@luxuryrentals.com</a></li>
            <li>Phone: <a href="tel:+252613395441" className="hover:text-primary">+252 613 395 441</a></li>
            <li>Support: <a href="#" className="hover:text-primary">24/7 Live Chat</a></li>
          </ul>
        </div>
        {/* More */}
        <div>
          <h4 className="text-md font-bold mb-3 text-white">More</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-primary">Features</a></li>
            <li><a href="#luxury" className="hover:text-primary">Luxury Rentals</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
            <li><a href="#" className="hover:text-primary">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-12 text-sm">
        &copy; {new Date().getFullYear()} Luxury Rental Houses. All rights reserved.
      </div>
    </footer>
  );
} 