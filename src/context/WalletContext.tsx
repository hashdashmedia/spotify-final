
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useUserContext } from './UserContext';

interface WalletContextType {
  balance: number;
  addFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: authedUser } = useAuth();
  const { users, updateUserBalance } = useUserContext();

  const balance = users.find(u => u.email === authedUser?.email)?.walletBalance || 0;

  const addFunds = (amount: number) => {
    if (authedUser) {
      updateUserBalance(authedUser.email, amount, 'add');
    }
  };

  const deductFunds = (amount: number): boolean => {
    if (authedUser && balance >= amount) {
        updateUserBalance(authedUser.email, amount, 'deduct');
        return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{ balance, addFunds, deductFunds }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
