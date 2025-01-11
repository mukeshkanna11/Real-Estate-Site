import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="border p-4 rounded">
      <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{property.name}</h3>
      <p>{property.location}</p>
      <p>${property.price}</p>
      <Link to={`/properties/${property._id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default PropertyCard;
