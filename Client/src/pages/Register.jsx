import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Track loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading state

    if (!formData.name || !formData.email || !formData.password) {
      setLoading(false);  // Stop loading if validation fails
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://real-estate-site-04db.onrender.com/api/auth/register', formData);

      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (err) {
      // Display a more descriptive error message
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again later.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Register</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}  {/* Display error message */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
          className="block w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="block w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className="block w-full p-2 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button 
          type="submit" 
          className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'}`} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
