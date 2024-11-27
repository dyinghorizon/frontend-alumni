import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import LoginForm from './components/auth/LoginForm';
import ProfilePage from './pages/ProfilePage';
import EducationPage from './pages/EducationPage';
import OrganizationPage from './pages/OrganizationPage';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route wrapper component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={
        <ProtectedRoute><ProfilePage /></ProtectedRoute>
      } />
      <Route path="/education" element={
        <ProtectedRoute><EducationPage /></ProtectedRoute>
      } />
      <Route path="/organization" element={
        <ProtectedRoute><OrganizationPage /></ProtectedRoute>
      } />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
};

export default App;