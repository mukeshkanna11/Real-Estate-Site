import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUserTie,
  FaUser,
  FaRegBuilding,
  FaSignOutAlt,
  FaListAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session data
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="fixed top-0 z-10 w-full text-white shadow-md bg-gradient-to-r from-teal-500 to-teal-800">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaRegBuilding className="mr-2 text-yellow-400" />
          <span>Real-Estate Site</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <Link
            to="/home"
            className="flex items-center transition hover:text-yellow-300"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            to="/agents"
            className="flex items-center transition hover:text-yellow-300"
          >
            <FaUserTie className="mr-2" />
            Agents
          </Link>
          <Link
            to="/register"
            className="flex items-center transition hover:text-yellow-300"
          >
            <FaUser className="mr-2" />
            Register
          </Link>
          <Link
            to="/booked-listings"
            className="flex items-center transition hover:text-yellow-300"
          >
            <FaListAlt className="mr-2" />
            Booked Listings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center transition hover:text-yellow-300"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            id="menu-toggle"
            className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        id="menu"
        className="flex flex-col p-4 space-y-4 text-white bg-teal-700 md:hidden"
      >
        <Link
          to="/home"
          className="flex items-center transition hover:text-yellow-300"
        >
          <FaHome className="mr-2" />
          Home
        </Link>
        <Link
          to="/agents"
          className="flex items-center transition hover:text-yellow-300"
        >
          <FaUserTie className="mr-2" />
          Agents
        </Link>
        <Link
          to="/register"
          className="flex items-center transition hover:text-yellow-300"
        >
          <FaUser className="mr-2" />
          Register
        </Link>
        <Link
          to="/booked-listings"
          className="flex items-center transition hover:text-yellow-300"
        >
          <FaListAlt className="mr-2" />
          Booked Listings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center transition hover:text-yellow-300"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
