import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

    // Check for empty fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setLoading(false);
      setError('All fields are required');
      return;
    }

    // Check for minimum password length
    if (formData.password.length < 6) {
      setLoading(false);
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post(
        'https://real-estate-site-04db.onrender.com/api/auth/register',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        alert('Registration successful! Redirecting to login...');
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Join RealEstatePro</h2>
        <p className="text-center text-gray-600">
          Create your account and explore exclusive property listings.
        </p>

        {error && <p className="p-2 mb-4 text-sm text-red-600 bg-red-100 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border rounded-md">
            <div className="px-3 text-gray-500">
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="w-full p-3 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md">
            <div className="px-3 text-gray-500">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3 focus:outline-none"
              required
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
              onChange={handleChange}
              value={formData.password}
              className="w-full p-3 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md">
            <div className="px-3 text-gray-500">
              <FaUserShield />
            </div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 bg-white focus:outline-none"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full p-3 text-white rounded-md transition ${
              loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
