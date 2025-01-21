import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const imagePath = property.image
    ? property.image.startsWith('http') // Check if it's an external URL
      ? property.image
      : `/images/${property.image}` // Local image from public/images
    : '/images/fallback-image.jpg'; // Default fallback image

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      {/* Image */}
      <div className="relative w-full h-48">
        <img
          src={imagePath}
          alt={property.name || 'Property Image'}
          className="absolute inset-0 object-cover w-full h-full"
          onError={(e) => {
            e.target.src = '/images/fallback-image.jpg'; // Fallback if the image fails
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{property.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{property.location}</p>
        <p className="mt-2 text-lg font-bold text-blue-600">${property.price.toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to={`/properties/${property._id}`}
          className="block w-full px-4 py-2 text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
