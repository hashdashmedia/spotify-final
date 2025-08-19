
import React, { useMemo } from 'react';
import { useOrderContext } from '../../context/OrderContext';
import { MOCK_USERS } from '../../constants';

const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <div className="bg-[#181818] p-6 rounded-lg shadow-lg flex items-center">
        <div className="p-3 rounded-full bg-green-500/20 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const AdminDashboardPage = () => {
    const { orders } = useOrderContext();

    const stats = useMemo(() => {
        const totalRevenue = orders.reduce((acc, order) => 
            order.status === 'Completed' ? acc + order.price : acc, 0);
        
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const totalUsers = MOCK_USERS.length;

        return { totalRevenue, totalOrders, pendingOrders, totalUsers };
    }, [orders]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats.totalRevenue.toFixed(2)}`}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                />
                 <StatCard 
                    title="Total Orders" 
                    value={stats.totalOrders}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                />
                <StatCard 
                    title="Pending Orders" 
                    value={stats.pendingOrders}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                 <StatCard 
                    title="Total Users" 
                    value={stats.totalUsers}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
            </div>

            {/* Can add more components here like recent orders list etc. */}
        </div>
    );
};

export default AdminDashboardPage;
