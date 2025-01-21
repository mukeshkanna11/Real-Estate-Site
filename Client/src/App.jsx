import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetails from './pages/PropertyDetails';
import AgentProfile from './pages/AgentProfile';
import AgentList from './pages/AgentList'; // New Page for Listing Agents
import AdminDashboard from './pages/AdminDashboard';

// Mock function to get user role (replace with real authentication logic)
const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    return payload.role; // Assuming the token contains a `role` field
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

// App Component
const App = () => {
  const isAuthenticated = getUserRole() !== null;

  return (
    <Router>
      {/* Show Navbar only on authenticated routes */}
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Redirect the base path to Register page */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/agents/:id" element={<AgentProfile />} />

        {/* Agent Listing Route */}
        <Route path="/agents" element={<AgentList />} />

        {/* Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* Admin-Only Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={['admin']}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
