

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup
    const userName = isLoginView ? 'Returning User' : name;
    login(email, userName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isLoginView ? 'Login' : 'Sign Up'}>
      <div>
        <div className="flex border-b border-gray-700">
          <button 
            onClick={() => setIsLoginView(true)} 
            className={`flex-1 py-2 text-sm font-semibold ${isLoginView ? 'text-[#1DB954] border-b-2 border-[#1DB954]' : 'text-gray-400'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLoginView(false)} 
            className={`flex-1 py-2 text-sm font-semibold ${!isLoginView ? 'text-[#1DB954] border-b-2 border-[#1DB954]' : 'text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <Button fullWidth variant="outline" type="button" onClick={handleSubmit}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.022,35.337,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Continue with Google
          </Button>
          <div className="flex items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
          </div>
          {!isLoginView && (
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]" required />
          )}
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]" required />
          {!isLoginView && (
            <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]" />
          )}
          <Button type="submit" fullWidth>{isLoginView ? 'Login' : 'Create Account'}</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
