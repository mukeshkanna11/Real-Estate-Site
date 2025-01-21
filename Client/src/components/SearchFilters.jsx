import React, { useState } from 'react';

const SearchFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({ location: '', priceRange: '', type: '' });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md md:flex-row"
    >
      {/* Location Input */}
      <div className="flex-1">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter location"
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price Range Input */}
      <div className="flex-1">
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <input
          type="text"
          id="priceRange"
          name="priceRange"
          placeholder="e.g., 1000-5000"
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Property Type Dropdown */}
      <div className="flex-1">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="flex items-end">
        <button
          type="submit"
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFilters;
