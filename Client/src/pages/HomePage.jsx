import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../api';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (filters) => {
    console.log('Filters:', filters);
    // Add search functionality here
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] flex items-center justify-center">
        <div className="p-6 text-center text-white bg-red-300 rounded-lg">
          <h1 className="mb-4 text-4xl font-bold">Welcome to DreamNest Real Estate</h1>
          <p className="mb-4 text-lg">
            Find your dream property with ease. Explore a wide range of listings tailored to your needs and budget.
          </p>
          <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </section>

      {/* Search Filters */}
      <section className="container mt-[-100px] px-4 py-8 mx-auto">
        <SearchFilters onSearch={handleSearch} />
      </section>

      {/* Featured Properties */}
      <section className="container px-4 py-8 mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">Featured Properties</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No properties found. Please try adjusting your search criteria.
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 bg-blue-100">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold text-blue-700">Why Choose DreamNest?</h2>
          <p className="mb-6 text-gray-600">
            At DreamNest, we prioritize your needs. Whether you're searching for a cozy home, a luxury apartment, or a commercial space, our platform connects you with the best properties and reliable agents.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-xl font-bold text-blue-600">Wide Listings</h3>
              <p className="text-gray-500">Explore thousands of properties across prime locations.</p>
            </div>
            <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-xl font-bold text-blue-600">Trusted Agents</h3>
              <p className="text-gray-500">Connect with verified agents to find your dream property.</p>
            </div>
            <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-xl font-bold text-blue-600">Easy Search</h3>
              <p className="text-gray-500">Use our advanced filters to find properties that fit your needs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
