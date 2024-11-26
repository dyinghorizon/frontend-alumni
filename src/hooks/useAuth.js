// import { useState, useCallback } from 'react';
// import { login, setAuthToken } from '../utils/httpUtils';
// import User from '../models/User';

// const useAuth = () => {
//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem('user');
//         if (savedUser) {
//             const parsedUser = JSON.parse(savedUser);
//             setAuthToken(parsedUser.token);
//             return new User(parsedUser);
//         }
//         return null;
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleLogin = useCallback(async (email, password) => {
//         setLoading(true);
//         setError(null);
        
//         try {
//             const response = await login({ email, password });
//             const newUser = User.fromLoginResponse(response);
            
//             // Save to localStorage and update axios headers
//             localStorage.setItem('user', JSON.stringify(newUser));
//             setAuthToken(newUser.token);
            
//             setUser(newUser);
//             return newUser;
//         } catch (err) {
//             setError(err.message);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const handleLogout = useCallback(() => {
//         localStorage.removeItem('user');
//         setAuthToken(null);
//         setUser(null);
//     }, []);

//     return {
//         user,
//         loading,
//         error,
//         login: handleLogin,
//         logout: handleLogout
//     };
// };

// export default useAuth;

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, setAuthToken } from '../utils/httpUtils';
import User from '../models/User';

const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setAuthToken(parsedUser.token);
            return new User(parsedUser);
        }
        return null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Effect to redirect based on auth state
    useEffect(() => {
        const path = window.location.pathname;
        if (user && path === '/login') {
            navigate('/profile');
        } else if (!user && path !== '/login') {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogin = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await loginApi({ email, password });
            const newUser = User.fromLoginResponse(response);
            
            localStorage.setItem('user', JSON.stringify(newUser));
            setAuthToken(newUser.token);
            setUser(newUser);
            
            // Redirect to profile page after successful login
            navigate('/profile');
            return newUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
        // Redirect to login page after logout
        navigate('/login', { replace: true });
    }, [navigate]);

    return {
        user,
        loading,
        error,
        login: handleLogin,
        logout: handleLogout
    };
};

export default useAuth;