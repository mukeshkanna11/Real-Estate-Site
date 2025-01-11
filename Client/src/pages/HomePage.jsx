import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../api';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProperties();
      setProperties(response.data);
    };
    fetchData();
  }, []);

  const handleSearch = (filters) => {
    console.log('Filters:', filters);
    // Add search functionality here
  };

  return (
    <div className="container mx-auto p-4">
      <SearchFilters onSearch={handleSearch} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
