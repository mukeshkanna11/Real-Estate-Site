import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetails from './pages/PropertyDetails';
import AgentProfile from './pages/AgentProfile';
import AgentList from './pages/AgentList';
import AdminDashboard from './pages/AdminDashboard';
import BookedListings from './pages/BookedListings'; // New Page for Booked Listings

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

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return element;
};

const App = () => {
  const isAuthenticated = getUserRole() !== null;

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/booked-listings" element={<BookedListings />} />
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
