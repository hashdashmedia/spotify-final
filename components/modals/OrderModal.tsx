
import React, { useState, useMemo } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useWallet } from '../../context/WalletContext';
import type { Service, ServicePackage } from '../../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  selectedPackage: ServicePackage | null;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, service, selectedPackage }) => {
  const { balance, deductFunds } = useWallet();
  const [url, setUrl] = useState('');
  const [quantity, setQuantity] = useState(selectedPackage?.quantity || 1000);
  const [error, setError] = useState('');
  
  const pricePerUnit = useMemo(() => {
    if (!selectedPackage) return 0;
    return selectedPackage.price / selectedPackage.quantity;
  }, [selectedPackage]);

  const totalPrice = useMemo(() => {
    return quantity * pricePerUnit;
  }, [quantity, pricePerUnit]);

  const handlePlaceOrder = () => {
    setError('');
    if (!url.toLowerCase().includes('spotify.com')) {
      setError('Please enter a valid Spotify URL.');
      return;
    }
    if (totalPrice > balance) {
      setError('Insufficient wallet balance. Please add funds.');
      return;
    }

    if(deductFunds(totalPrice)) {
      // Mock order placement
      alert(`Order placed successfully for ${quantity} ${service?.name} on ${url}. \n$${totalPrice.toFixed(2)} has been deducted from your wallet.`);
      onClose();
    }
  };

  React.useEffect(() => {
      if (selectedPackage) {
          setQuantity(selectedPackage.quantity);
      }
  }, [selectedPackage]);


  if (!service || !selectedPackage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order ${service.name}`}>
      <div className="space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Selected Package</p>
          <p className="text-lg font-bold text-white">{selectedPackage.quantity.toLocaleString()} {service.name.split(' ')[1]}</p>
          <p className="text-gray-300">${selectedPackage.price.toFixed(2)}</p>
        </div>
        
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">Spotify URL</label>
          <input 
            type="text" 
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://open.spotify.com/track/..." 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
           <input 
            type="number" 
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(selectedPackage.quantity, Number(e.target.value)))}
            min={selectedPackage.quantity}
            step="100"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum order: {selectedPackage.quantity.toLocaleString()}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-400">Total Price</p>
          <p className="text-3xl font-bold text-[#1DB954]">${totalPrice.toFixed(2)}</p>
          <p className="text-xs text-gray-500">Available balance: ${balance.toFixed(2)}</p>
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button onClick={handlePlaceOrder} fullWidth>
          Place Order
        </Button>
      </div>
    </Modal>
  );
};

export default OrderModal;
