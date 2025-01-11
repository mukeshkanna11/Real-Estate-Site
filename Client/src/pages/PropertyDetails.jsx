import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyDetails } from '../api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPropertyDetails(id);
      setProperty(data);
    };
    fetchData();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">{property.name}</h2>
      <img src={property.image} alt={property.name} className="w-full h-64 object-cover my-4" />
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price: ${property.price}</p>
      <p>Rooms: {property.rooms}</p>
    </div>
  );
};

export default PropertyDetails;
