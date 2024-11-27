import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/profile">Alumni Portal</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    aria-expanded={!isNavCollapsed}
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                                to="/profile"
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}
                                to="/education"
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                Education
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/organization' ? 'active' : ''}`}
                                to="/organization"
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                Organization
                            </Link>
                        </li>
                    </ul>
                    <button 
                        className="btn btn-light"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;