// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';

// const Navbar = () => {
//     const { logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//             <div className="container">
//                 <Link className="navbar-brand" to="/profile">Alumni Portal</Link>
//                 <button 
//                     className="navbar-toggler" 
//                     type="button" 
//                     data-bs-toggle="collapse" 
//                     data-bs-target="#navbarNav"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav me-auto">
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
//                                 to="/profile"
//                             >
//                                 Profile
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}
//                                 to="/education"
//                             >
//                                 Education
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link ${location.pathname === '/organization' ? 'active' : ''}`}
//                                 to="/organization"
//                             >
//                                 Organization
//                             </Link>
//                         </li>
//                     </ul>
//                     <button 
//                         className="btn btn-light"
//                         onClick={handleLogout}
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        // Navigation is handled in useAuth hook
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/profile">Alumni Portal</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                                to="/profile"
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}
                                to="/education"
                            >
                                Education
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/organization' ? 'active' : ''}`}
                                to="/organization"
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