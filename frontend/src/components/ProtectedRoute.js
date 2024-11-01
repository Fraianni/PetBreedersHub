// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assicurati di importare useAuth correttamente

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
