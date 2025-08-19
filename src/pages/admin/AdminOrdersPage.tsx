
import React from 'react';
import { useOrderContext } from '../../context/OrderContext';
import type { OrderStatus } from '../../types';

const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useOrderContext();

  const statusColorMap: Record<OrderStatus, string> = {
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'In Progress': 'bg-blue-500/20 text-blue-400',
    'Completed': 'bg-green-500/20 text-green-400',
    'Cancelled': 'bg-red-500/20 text-red-400',
  };

  const statusOptions: OrderStatus[] = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Orders</h1>
      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/40 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div>{order.serviceName}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 max-w-xs truncate">
                    <a href={order.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#1DB954]">{order.url}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1DB954]">${order.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-[#1DB954]"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
