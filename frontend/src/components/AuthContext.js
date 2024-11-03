// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {axiosInstance} from './axiosConfig'; // Update the path accordingly
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user information
    const [loading, setLoading] = useState(true); // To manage loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // To manage loading state

    // Function to log in the user
    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/login/', { username, password });
            console.log(response.data);
            setUser(response.data.username); // Set the user state
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., show a notification)
        }
    };

// Function to log out the user
const logout = async () => {
    try {
        await axiosInstance.post('logout/');  // Call the Django logout endpoint
        setUser(null);  // Clear the user state
        localStorage.removeItem('authToken'); // Clear any auth tokens if stored
    } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout error if needed
    }
};

    // Optional: Check if the user is already authenticated
    useEffect(() => {
        // Here you can check if there's an existing session or token
        const checkAuth = async () => {
            // Example: Fetch user info or check token validity
            try {
                const response = await axios.get('/api/check-auth/');
                console.log(response.data);
            
                setIsAuthenticated(response.data.is_authenticated);
            
                if (response.data.is_authenticated) {
                    setUser(response.data.user); // Store the user data if authenticated
                } else {
                    setUser(null); // Clear user data if not authenticated
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setUser(null); // Clear user data on error
            } finally {
                setLoading(false); // Set loading to false once the check is done
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout,isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
