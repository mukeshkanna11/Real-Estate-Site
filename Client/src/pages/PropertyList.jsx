import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../api'; // Ensure you have this API function
import PropertyCard from '../components/PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProperties(); // Call the API to get properties
        setProperties(response.data);
      } catch (err) {
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="mt-4 text-center">Loading properties...</div>;
  }

  if (error) {
    return <div className="mt-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">Available Properties</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
