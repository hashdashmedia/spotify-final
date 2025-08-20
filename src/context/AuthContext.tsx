import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { useUserContext } from './UserContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { users } = useUserContext();

  const login = (email: string, name: string) => {
    // In a real app, this would involve a backend call
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
    } else {
      // Mock sign-up for a user not in the initial list.
      const isAdmin = email.toLowerCase() === 'admin@spotifyboost.com';
      const newUser: User = {
        email,
        name,
        isAdmin,
        walletBalance: 0,
      };
      setUser(newUser);
    }
  };

  const logout = () => {
    // In a real app, this would invalidate a token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};