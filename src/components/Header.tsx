
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useModal } from '../hooks/useModal';
import AuthModal from './modals/AuthModal';
import WalletModal from './modals/WalletModal';
import Button from './ui/Button';
import { UserCircleIcon } from '../constants';


const Header = () => {
  const { user, logout } = useAuth();
  const { balance } = useWallet();
  const { isOpen: isAuthOpen, open: openAuth, close: closeAuth } = useModal();
  const { isOpen: isWalletOpen, open: openWallet, close: closeWallet } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'text-white bg-white/10' : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


  return (
    <>
      <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <svg className="w-8 h-8 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.33c-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.89-1.42 1.4-3.05 1.4-4.83 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.54-.42 2.92-1.12 4.14-.2.32-.59.43-.9.23s-.43-.59-.23-.9C14.79 12.3 15.25 11 15.25 9.5c0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.25-.37 2.33-1.02 3.25-.2.32-.59.43-.9.23s-.43-.59-.23-.9c.55-.78.85-1.73.85-2.75 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 .78-.22 1.48-.63 2.08-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.33-.47.51-1.02.51-1.61 0-.41-.34-.75-.75-.75S7 8.67 7 9.08c0 2.37 1.03 4.49 2.75 5.92.32.2.43.59.23.9s-.59.43-.9.23C7.51 14.88 6.5 12.83 6.5 10.5c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5c0 2.21-.81 4.2-2.11 5.83z" />
                </svg>
                <span className="text-xl font-bold text-white">SpotifyBoost</span>
              </Link>
              <nav className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <NavLink to="/" className={navLinkClass}>Home</NavLink>
                  <NavLink to="/services" className={navLinkClass}>Services</NavLink>
                  <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
                </div>
              </nav>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <button onClick={openWallet} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <span className="font-semibold text-[#1DB954]">${balance.toFixed(2)}</span>
                    <span className="text-gray-400">Wallet</span>
                  </button>
                  <div className="relative" ref={profileMenuRef}>
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                       <UserCircleIcon className="w-7 h-7 text-gray-300"/>
                    </button>
                    {isProfileOpen && (
                       <div className="absolute right-0 mt-2 w-48 bg-[#181818] border border-gray-700 rounded-md shadow-lg py-1 z-50">
                          {user.isAdmin && <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-[#1DB954] hover:bg-gray-700 font-semibold">Admin Panel</Link>}
                          <Link to="/account" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">My Account</Link>
                          <Link to="/orders" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Order History</Link>
                          <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Logout</button>
                       </div>
                    )}
                  </div>
                </>
              ) : (
                <Button onClick={openAuth}>Login / Sign Up</Button>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/services" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Services</NavLink>
                <NavLink to="/about" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
                {user ? (
                <>
                  {user.isAdmin && <NavLink to="/admin" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Admin Panel</NavLink>}
                  <NavLink to="/account" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>My Account</NavLink>
                  <NavLink to="/orders" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Order History</NavLink>
                  <button onClick={() => {openWallet(); setIsMenuOpen(false);}} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                    Wallet: <span className="font-semibold text-[#1DB954]">${balance.toFixed(2)}</span>
                  </button>
                  <button onClick={() => {logout(); setIsMenuOpen(false);}} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => {openAuth(); setIsMenuOpen(false);}} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                  Login / Sign Up
                </button>
              )}
              </div>
            </div>
          )}
        </div>
      </header>
      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
      <WalletModal isOpen={isWalletOpen} onClose={closeWallet} />
    </>
  );
};

export default Header;
