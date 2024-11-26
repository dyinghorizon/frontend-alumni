import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import ProfilePage from './pages/ProfilePage';
import EducationPage from './pages/EducationPage';
import OrganizationPage from './pages/OrganizationPage';
import useAuth from './hooks/useAuth';
import './App.css';

function App() {
  const { user } = useAuth();

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/profile" replace /> : <LoginForm />} 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/education" 
        element={
          <ProtectedRoute>
            <EducationPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organization" 
        element={
          <ProtectedRoute>
            <OrganizationPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect root to profile if logged in, otherwise to login */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
      />
      
      {/* Catch all other routes */}
      <Route 
        path="*" 
        element={<Navigate to={user ? "/profile" : "/login"} replace />} 
      />
    </Routes>
  );
}

export default App;