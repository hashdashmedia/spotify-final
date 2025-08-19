import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            isActive ? 'bg-green-500/20 text-[#1DB954]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }`;

    const iconClass = "w-5 h-5 mr-3";

    return (
        <div className="flex h-screen bg-[#121212] text-white">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[#181818] p-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <svg className="w-8 h-8 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.33c-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.89-1.42 1.4-3.05 1.4-4.83 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.54-.42 2.92-1.12 4.14-.2.32-.59.43-.9.23s-.43-.59-.23-.9C14.79 12.3 15.25 11 15.25 9.5c0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.25-.37 2.33-1.02 3.25-.2.32-.59.43-.9.23s-.43-.59-.23-.9c.55-.78.85-1.73.85-2.75 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 .78-.22 1.48-.63 2.08-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.33-.47.51-1.02.51-1.61 0-.41-.34-.75-.75-.75S7 8.67 7 9.08c0 2.37 1.03 4.49 2.75 5.92.32.2.43.59.23.9s-.59.43-.9.23C7.51 14.88 6.5 12.83 6.5 10.5c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5c0 2.21-.81 4.2-2.11 5.83z" />
                        </svg>
                        <span className="text-xl font-bold text-white">Admin Panel</span>
                    </div>
                    <nav className="space-y-2">
                        <NavLink to="/admin" end className={navLinkClass}>Dashboard</NavLink>
                        <NavLink to="/admin/orders" className={navLinkClass}>Orders</NavLink>
                        <NavLink to="/admin/users" className={navLinkClass}>Users</NavLink>
                        <NavLink to="/admin/services" className={navLinkClass}>Services</NavLink>
                        <NavLink to="/admin/content" className={navLinkClass}>Content</NavLink>
                    </nav>
                </div>
                <div>
                     <Link to="/" className={navLinkClass({ isActive: false })}>Back to Site</Link>
                     <button onClick={logout} className={`w-full text-left ${navLinkClass({isActive: false})}`}>Logout</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;