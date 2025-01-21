import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide the navbar on login page
    const navbar = document.querySelector('nav');
    if (navbar) navbar.style.display = 'none';
    return () => {
      if (navbar) navbar.style.display = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://real-estate-site-04db.onrender.com/api/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, role } = response.data;
      localStorage.setItem('token', token);

      // Redirect to the HomePage after successful login
      navigate('/home'); // Updated to navigate to '/home'

      // Optional: Log the role for debugging purposes
      console.log('Logged in as:', role);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600">Log in to manage your real estate account.</p>

        {error && <p className="p-2 mb-4 text-sm text-red-600 bg-red-100 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border rounded-md">
            <div className="px-3 text-gray-500">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded-md">
            <div className="px-3 text-gray-500">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 text-white rounded-md transition ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
