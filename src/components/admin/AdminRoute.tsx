
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
    children: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user || !user.isAdmin) {
        // Redirect them to the home page if not an admin
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
