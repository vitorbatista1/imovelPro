import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PropertyManagementPage from './pages/PropertyManagementPage';
import { useAuth } from './hooks/useAuth'; // Custom Hook for authentication
import '../src/styles/global.styles.css'

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/properties" element={isAuthenticated ? <PropertyManagementPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;