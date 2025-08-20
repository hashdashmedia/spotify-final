import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useUserContext } from '../../context/UserContext';
import type { User } from '../../types';

interface ManageWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ManageWalletModal: React.FC<ManageWalletModalProps> = ({ isOpen, onClose, user }) => {
  const { updateUserBalance } = useUserContext();
  const [amount, setAmount] = useState(0);

  const handleUpdate = (type: 'add' | 'deduct') => {
    if (amount <= 0) {
      alert('Please enter a positive amount.');
      return;
    }
    updateUserBalance(user.email, amount, type);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Manage Wallet for ${user.name}`}>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Current Balance</p>
          <p className="text-3xl font-bold text-white">${user.walletBalance.toFixed(2)}</p>
        </div>

        <div>
          <label htmlFor="walletAmount" className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
          <input
            id="walletAmount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            placeholder="0.00"
          />
        </div>
        
        <div className="flex space-x-2">
            <Button fullWidth variant="outline" onClick={() => handleUpdate('deduct')}>
                Deduct Funds
            </Button>
            <Button fullWidth onClick={() => handleUpdate('add')}>
                Add Funds
            </Button>
        </div>

      </div>
    </Modal>
  );
};

export default ManageWalletModal;
