import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'your-render-url' with your actual Render backend URL
      const response = await axios.post('https://real-estate-site-04db.onrender.com/api/auth/login', formData);

      // Assuming the response contains a token
      localStorage.setItem('token', response.data.token);

      // Navigate to the home page or dashboard after successful login
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
