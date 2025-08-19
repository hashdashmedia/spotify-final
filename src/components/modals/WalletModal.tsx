

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useWallet } from '../../context/WalletContext';
import { WALLET_BONUSES } from '../../constants';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { balance, addFunds } = useWallet();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleAddFunds = () => {
    if (selectedAmount) {
      const bonusInfo = WALLET_BONUSES.find(b => b.addAmount === selectedAmount);
      const totalToAdd = bonusInfo ? bonusInfo.total : selectedAmount;
      addFunds(totalToAdd);
      // Here you would normally integrate a payment gateway
      alert(`$${totalToAdd.toFixed(2)} added to your wallet (including bonus)!`);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Wallet">
      <div className="space-y-6">
        <div>
          <p className="text-gray-400 text-sm">Current Balance</p>
          <p className="text-4xl font-bold text-[#1DB954]">${balance.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Add Funds & Get a Bonus!</h3>
          <div className="grid grid-cols-2 gap-3">
            {WALLET_BONUSES.map((bonus) => (
              <button 
                key={bonus.addAmount}
                onClick={() => setSelectedAmount(bonus.addAmount)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${selectedAmount === bonus.addAmount ? 'bg-[#1DB954] text-black ring-2 ring-white' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                <p className="font-bold">Add ${bonus.addAmount}</p>
                <p className={`text-sm ${selectedAmount === bonus.addAmount ? 'text-gray-900' : 'text-gray-400'}`}>Get <span className="font-semibold">${bonus.bonusAmount} Bonus</span></p>
                <p className={`text-xs font-semibold ${selectedAmount === bonus.addAmount ? 'text-black' : 'text-[#1DB954]'}`}>Total: ${bonus.total}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <Button onClick={handleAddFunds} disabled={!selectedAmount} fullWidth>
            {selectedAmount ? `Add $${selectedAmount} to Wallet` : 'Select an amount'}
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">You will be redirected to our secure payment processor.</p>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
