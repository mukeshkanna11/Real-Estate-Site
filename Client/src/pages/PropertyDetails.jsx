import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyDetails } from "../api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the property details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchPropertyDetails(id);
        setProperty(data);
      } catch (err) {
        setError("Failed to load property details. Please try again later.");
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle booking and store the property in localStorage
  const handleBooking = () => {
    if (!property) return;

    const bookedProperty = {
      id: property.id,
      name: property.name,
      location: property.location,
      price: property.price,
      image: property.image,
    };

    // Store in localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookedProperties")) || [];
    existingBookings.push(bookedProperty);
    localStorage.setItem("bookedProperties", JSON.stringify(existingBookings));

    alert(`Booking successfully completed for "${property.name}"!`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-500">Loading property details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );
  }

  // No property found
  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-500">No property found.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-6 mx-auto mt-20 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Property Details</h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore all the information about this property, including its price, features, and amenities.
        </p>
      </div>

      {/* Property Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{property.name}</h2>
        <p className="mt-1 text-gray-600">{property.location || "Location not specified"}</p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mb-6">
        <img
          src={property.image || "/images/fallback-image.jpg"}
          alt={property.name || "Property Image"}
          className="object-cover w-64 h-48 rounded-lg"
          onError={(e) => {
            e.target.src = "/images/fallback-image.jpg"; // Fallback if image fails
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Price:</span> ${property.price?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Rooms:</span> {property.rooms || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Bathrooms:</span> {property.bathrooms || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Size:</span> {property.size || "N/A"} sqft
          </p>
        </div>
      </div>

      {/* Property Description */}
      <div className="mt-6">
        <p className="text-gray-700">
          <span className="font-semibold text-gray-800">Description:</span> {property.description || "No description provided."}
        </p>
      </div>

      {/* Amenities Section */}
      <div className="mt-6">
        <p className="text-gray-700">
          <span className="font-semibold text-gray-800">Amenities:</span>{" "}
          {property.amenities?.length > 0 ? property.amenities.join(", ") : "Not specified."}
        </p>
      </div>

      {/* Booking Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleBooking}
          className="px-6 py-2 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
