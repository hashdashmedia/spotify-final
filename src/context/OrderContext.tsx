
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Order, OrderStatus } from '../types';
import { ORDER_HISTORY } from '../constants';

interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(ORDER_HISTORY);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
