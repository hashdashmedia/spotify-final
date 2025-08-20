import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User } from '../types';
import { INITIAL_USERS } from '../constants';

interface UserContextType {
  users: User[];
  updateUserBalance: (email: string, amount: number, type: 'add' | 'deduct') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'spotifyboost-users';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const storedUsers = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS;
    } catch (error) {
      console.error('Error reading users from localStorage', error);
      return INITIAL_USERS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error writing users to localStorage', error);
    }
  }, [users]);

  const updateUserBalance = (email: string, amount: number, type: 'add' | 'deduct') => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.email === email) {
          const newBalance = type === 'add'
            ? user.walletBalance + amount
            : user.walletBalance - amount;
          return { ...user, walletBalance: Math.max(0, newBalance) }; // Ensure balance doesn't go below zero
        }
        return user;
      })
    );
  };

  return (
    <UserContext.Provider value={{ users, updateUserBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
