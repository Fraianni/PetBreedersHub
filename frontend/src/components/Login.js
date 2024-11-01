// Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Import the AuthContext

const Login = () => {
    const { login, user, loading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    if (loading) return <div>Loading...</div>; // Show loading state if checking auth

    if (user) {
        return <h2>Benvenuto, {user.username}!</h2>; // Show welcome message if authenticated
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
