

import React from 'react';
import type { Service, ServicePackage } from '../types';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

interface ServiceCardProps {
  service: Service;
  onOrder: (service: Service, pkg: ServicePackage) => void;
  onLogin: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOrder, onLogin }) => {
  const { user } = useAuth();
  
  return (
    <div className="bg-[#181818] rounded-lg p-6 shadow-lg hover:shadow-green-500/20 transition-shadow duration-300 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        {service.icon}
        <h3 className="text-2xl font-bold text-white">{service.name}</h3>
      </div>
      <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
      
      <div className="space-y-3">
        {service.packages.map((pkg) => {
          const pricePer1k = (pkg.price / pkg.quantity) * 1000;
          return (
            <div key={pkg.id} className="bg-gray-800/50 p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-bold text-white">{pkg.quantity.toLocaleString()} <span className="text-sm font-normal text-gray-300">{service.name.split(' ')[1]}</span></p>
                <p className="text-xs text-gray-400">
                  ${pricePer1k.toFixed(2)} per 1k
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">${pkg.price.toFixed(2)}</p>
                <Button size="sm" onClick={() => user ? onOrder(service, pkg) : onLogin()}>
                  Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCard;
