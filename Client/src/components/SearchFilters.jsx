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
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <input type="text" name="priceRange" placeholder="Price Range" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="">Type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </form>
  );
};

export default SearchFilters;
