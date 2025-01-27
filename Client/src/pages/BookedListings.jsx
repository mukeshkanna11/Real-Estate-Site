import React, { useEffect, useState } from "react";

const BookedListings = () => {
  const [bookedProperties, setBookedProperties] = useState([]);

  useEffect(() => {
    // Get booked properties from localStorage
    const storedProperties = JSON.parse(localStorage.getItem("bookedProperties")) || [];
    setBookedProperties(storedProperties);
  }, []);

  const handleCancelBooking = (propertyId) => {
    // Log to check the clicked property ID
    console.log("Canceling booking for property ID:", propertyId);

    // Remove the property with the given id from bookedProperties
    const updatedProperties = bookedProperties.filter(property => property.id !== propertyId);
    setBookedProperties(updatedProperties);

    // Log the updated list of properties
    console.log("Updated properties list:", updatedProperties);

    // Update localStorage with the updated list of booked properties
    localStorage.setItem("bookedProperties", JSON.stringify(updatedProperties));
  };

  return (
    <div className="container max-w-6xl px-6 py-10 mx-auto mt-20 rounded-lg shadow-md bg-gray-50">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">Your Booked Properties</h1>

      {bookedProperties.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-lg text-gray-600">No booked properties found. Start booking your dream properties today!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookedProperties.map((property) => (
            <div
              key={property.id}
              className="p-5 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={property.image || "/images/fallback-image.jpg"}
                  alt={property.name || "Property Image"}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
              <p className="mt-1 text-gray-600">{property.location || "Location not specified"}</p>
              <p className="mt-1 text-lg font-medium text-gray-700">
                Price: ${property.price?.toLocaleString() || "N/A"}
              </p>
              <button
                onClick={() => handleCancelBooking(property.id)}
                className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedListings;
