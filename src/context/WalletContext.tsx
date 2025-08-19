

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WalletContextType {
  balance: number;
  addFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);

  const addFunds = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
  };

  const deductFunds = (amount: number) => {
    if (balance >= amount) {
      setBalance(prevBalance => prevBalance - amount);
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
