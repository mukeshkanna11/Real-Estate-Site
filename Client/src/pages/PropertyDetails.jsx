import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyDetails } from '../api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchPropertyDetails(id);
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = () => {
    alert('Booking successfully completed!');
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-500">Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl px-4 py-6 mx-auto mt-20 bg-white rounded-lg shadow-lg">
      {/* Page Description */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Property Details</h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore detailed information about this property, including its location, features, amenities, and more. Get a closer
          look at what makes this property a perfect fit for your next home or investment.
        </p>
      </div>

      {/* Property Title and Location */}
      <h2 className="text-3xl font-semibold text-gray-800">{property.name}</h2>
      <p className="mt-2 text-lg text-gray-600">{property.location}</p>

      {/* Property Details */}
      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Price:</span> ${property.price.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Rooms:</span> {property.rooms}
            </p>
          </div>

          <div>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Bathrooms:</span> {property.bathrooms || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Size:</span> {property.size || 'N/A'} sqft
            </p>
          </div>
        </div>

        {/* Property Description */}
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Description:</span> {property.description}
          </p>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Amenities:</span> {property.amenities?.join(', ') || 'N/A'}
          </p>
        </div>

        {/* Booking Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleBooking}
            className="px-6 py-2 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
