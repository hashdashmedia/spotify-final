import React, { useState, useMemo } from 'react';
import { useOrderContext } from '../../context/OrderContext';
import type { OrderStatus } from '../../types';

const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useOrderContext();

  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [customDateRange, setCustomDateRange] = useState({ from: '', to: '' });

  const statusColorMap: Record<OrderStatus, string> = {
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'In Progress': 'bg-blue-500/20 text-blue-400',
    'Completed': 'bg-green-500/20 text-green-400',
    'Cancelled': 'bg-red-500/20 text-red-400',
  };

  const statusOptions: OrderStatus[] = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  const filteredOrders = useMemo(() => {
    let ordersToFilter = [...orders];

    if (statusFilter !== 'All') {
      ordersToFilter = ordersToFilter.filter(order => order.status === statusFilter);
    }

    if (emailFilter) {
      ordersToFilter = ordersToFilter.filter(order => order.userEmail.toLowerCase().includes(emailFilter.toLowerCase()));
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const setTimeToZero = (date: Date) => {
        date.setHours(0, 0, 0, 0);
        return date;
    }

    switch(dateFilter) {
        case 'Today': {
            const todayStart = setTimeToZero(new Date());
            ordersToFilter = ordersToFilter.filter(o => setTimeToZero(new Date(o.date)) >= todayStart);
            break;
        }
        case 'Yesterday': {
            const yesterdayStart = setTimeToZero(new Date());
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
            const todayStart = setTimeToZero(new Date());
            ordersToFilter = ordersToFilter.filter(o => {
                const orderDate = setTimeToZero(new Date(o.date));
                return orderDate >= yesterdayStart && orderDate < todayStart;
            });
            break;
        }
        case 'Last 7 Days': {
            const sevenDaysAgo = setTimeToZero(new Date());
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            ordersToFilter = ordersToFilter.filter(o => setTimeToZero(new Date(o.date)) >= sevenDaysAgo);
            break;
        }
        case 'This Month': {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            ordersToFilter = ordersToFilter.filter(o => new Date(o.date) >= monthStart);
            break;
        }
        case 'Last 90 Days': {
             const ninetyDaysAgo = setTimeToZero(new Date());
            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
            ordersToFilter = ordersToFilter.filter(o => setTimeToZero(new Date(o.date)) >= ninetyDaysAgo);
            break;
        }
        case 'Custom Range': {
            if (customDateRange.from && customDateRange.to) {
                const fromDate = setTimeToZero(new Date(customDateRange.from));
                const toDate = setTimeToZero(new Date(customDateRange.to));
                toDate.setDate(toDate.getDate() + 1); // include the whole 'to' day

                ordersToFilter = ordersToFilter.filter(o => {
                    const orderDate = setTimeToZero(new Date(o.date));
                    return orderDate >= fromDate && orderDate < toDate;
                });
            }
            break;
        }
        default: // All Time
            break;
    }


    return ordersToFilter;
  }, [orders, statusFilter, emailFilter, dateFilter, customDateRange]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Orders</h1>
      
      <div className="bg-[#181818] p-4 rounded-lg mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <input 
            type="text"
            placeholder="Filter by email..."
            value={emailFilter}
            onChange={e => setEmailFilter(e.target.value)}
            className="w-full md:w-auto bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as OrderStatus | 'All')}
            className="w-full md:w-auto bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          >
              <option value="All">All Statuses</option>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
           <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="w-full md:w-auto bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Custom Range">Custom Range</option>
          </select>
          {dateFilter === 'Custom Range' && (
              <div className="flex items-center space-x-2">
                 <input type="date" value={customDateRange.from} onChange={e => setCustomDateRange(p => ({...p, from: e.target.value}))} className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-white" />
                 <span>to</span>
                 <input type="date" value={customDateRange.to} onChange={e => setCustomDateRange(p => ({...p, to: e.target.value}))} className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-white" />
              </div>
          )}
      </div>

      <div className="bg-[#181818] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/40 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
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
