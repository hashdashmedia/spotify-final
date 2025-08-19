

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black mt-16">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2">
                 <svg className="w-8 h-8 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.33c-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.89-1.42 1.4-3.05 1.4-4.83 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.54-.42 2.92-1.12 4.14-.2.32-.59.43-.9.23s-.43-.59-.23-.9C14.79 12.3 15.25 11 15.25 9.5c0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.25-.37 2.33-1.02 3.25-.2.32-.59.43-.9.23s-.43-.59-.23-.9c.55-.78.85-1.73.85-2.75 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 .78-.22 1.48-.63 2.08-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.33-.47.51-1.02.51-1.61 0-.41-.34-.75-.75-.75S7 8.67 7 9.08c0 2.37 1.03 4.49 2.75 5.92.32.2.43.59.23.9s-.59.43-.9.23C7.51 14.88 6.5 12.83 6.5 10.5c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5c0 2.21-.81 4.2-2.11 5.83z" />
                </svg>
                <span className="text-xl font-bold text-white">SpotifyBoost</span>
            </div>
            <p className="text-gray-400 mt-2 text-sm">Elevate your music career.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/services" className="text-base text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy-policy" className="text-base text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-base text-gray-400 hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:support@spotifyboost.com" className="text-base text-gray-400 hover:text-white">support@spotifyboost.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} SpotifyBoost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
