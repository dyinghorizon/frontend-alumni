import { useState, useCallback, useEffect } from 'react';
import { login as loginApi, setAuthToken } from '../utils/httpUtils';
import User from '../models/User';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setAuthToken(parsedUser.token);
                    setUser(new User(parsedUser));
                } catch (err) {
                    console.error('Error parsing stored user:', err);
                    localStorage.removeItem('user');
                    setAuthToken(null);
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const handleLogin = useCallback(async (email, password) => {
        setLoading(true);
        
        try {
            const response = await loginApi({ email, password });
            const newUser = User.fromLoginResponse(response);
            
            localStorage.setItem('user', JSON.stringify(newUser));
            setAuthToken(newUser.token);
            setUser(newUser);
            setError(null); // Clear error only on successful login
            return newUser;
        } catch (err) {
            const errorMessage = err.message || 'Login failed. Please try again.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
        setError(null); // Clear error on logout
    }, []);

    // Function to clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        loading,
        error,
        login: handleLogin,
        logout: handleLogout,
        clearError
    };
};

export default useAuth;