import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Service, ServicePackage } from '../types';
import { INITIAL_SERVICES } from '../constants';

interface ServiceContextType {
  services: Service[];
  getServiceById: (id: string) => Service | undefined;
  updateServicePackage: (serviceId: string, updatedPackage: ServicePackage) => void;
  addServicePackage: (serviceId: string, newPackage: Omit<ServicePackage, 'id'>) => void;
  deleteServicePackage: (serviceId: string, packageId: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'spotifyboost-services';

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const storedServices = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedServices) {
        // A simple migration to add React nodes back to the services if they are missing
        const parsedServices = JSON.parse(storedServices);
        return parsedServices.map((service: Service, index: number) => ({
            ...service,
            icon: INITIAL_SERVICES[index].icon
        }))
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
    return INITIAL_SERVICES;
  });

  useEffect(() => {
    try {
      // Create a serializable version of services without the React nodes
      const servicesToStore = services.map(({ icon, ...rest }) => rest);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(servicesToStore));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [services]);

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  const updateServicePackage = (serviceId: string, updatedPackage: ServicePackage) => {
    setServices(currentServices =>
      currentServices.map(service => {
        if (service.id === serviceId) {
          // If this package is being marked as most popular, unmark others.
          const newPackages = service.packages.map(pkg => {
              const isCurrentPackage = pkg.id === updatedPackage.id;
              // Update the target package
              if (isCurrentPackage) return updatedPackage;
              // If target package is most popular, ensure this one is not
              if (updatedPackage.isMostPopular) return { ...pkg, isMostPopular: false };
              return pkg;
          });

          return { ...service, packages: newPackages };
        }
        return service;
      })
    );
  };

  const addServicePackage = (serviceId: string, newPackageData: Omit<ServicePackage, 'id'>) => {
    setServices(currentServices =>
      currentServices.map(service => {
        if (service.id === serviceId) {
          const newPackage: ServicePackage = {
            ...newPackageData,
            id: `pkg-${new Date().getTime()}-${Math.random()}`,
          };
           // If new package is most popular, unmark others.
          let newPackages = [...service.packages, newPackage];
          if(newPackage.isMostPopular){
              newPackages = newPackages.map(p => p.id === newPackage.id ? p : {...p, isMostPopular: false})
          }

          return { ...service, packages: newPackages };
        }
        return service;
      })
    );
  };

  const deleteServicePackage = (serviceId: string, packageId: string) => {
    setServices(currentServices =>
      currentServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            packages: service.packages.filter(pkg => pkg.id !== packageId),
          };
        }
        return service;
      })
    );
  };

  return (
    <ServiceContext.Provider value={{ services, getServiceById, updateServicePackage, addServicePackage, deleteServicePackage }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};