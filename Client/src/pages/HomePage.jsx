import React, { useEffect, useState } from "react";
import { fetchProperties } from "../api";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response.data);
        setFilteredProperties(response.data); // Initialize filtered properties
        setLoading(false); // Stop loading after data fetch
      } catch (error) {
        setLoading(false); // Stop loading even on error
      }
    };
    fetchData();
  }, []);

  const handleSearch = (filters) => {
    if (!filters.location && !filters.priceRange && !filters.type) {
      setFilteredProperties(properties); // Reset to all properties
      return;
    }

    const filtered = properties.filter((property) => {
      const matchesLocation = filters.location
        ? property.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesPriceRange = filters.priceRange
        ? (() => {
            const [min, max] = filters.priceRange.split("-").map(Number);
            return property.price >= min && property.price <= max;
          })()
        : true;
      const matchesType = filters.type ? property.type === filters.type : true;

      return matchesLocation && matchesPriceRange && matchesType;
    });

    setFilteredProperties(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    alert("You have been logged out.");
    navigate("/login"); // Redirect to login page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-blue-600">
            Loading properties...
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load the latest listings for you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-blue-700">
        <h1 className="text-2xl font-bold text-white">DreamNest Real Estate</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Hero Section */}
      <section
  className="relative flex items-center justify-center bg-cover bg-center h-[60vh] mt-[-80px]"
  style={{ backgroundImage: 'url(/hero-image.jpg)' }}
>
  <div className="p-6 text-center text-white bg-black bg-opacity-50 rounded-lg">
    <h1 className="mb-4 text-3xl font-semibold">Find Your Dream Property</h1>
    <p className="mb-4 text-lg">
      Browse a variety of listings that fit your needs and budget.
    </p>
    <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
      Start Searching
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
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
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
            <div className="w-64 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="mb-2 text-xl font-bold text-blue-600">Wide Listings</h3>
              <p className="text-gray-500">Explore thousands of properties across prime locations.</p>
            </div>
            <div className="w-64 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="mb-2 text-xl font-bold text-blue-600">Trusted Agents</h3>
              <p className="text-gray-500">Connect with verified agents to find your dream property.</p>
            </div>
            <div className="w-64 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="mb-2 text-xl font-bold text-blue-600">Easy Search</h3>
              <p className="text-gray-500">Use our advanced filters to find properties that fit your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white bg-blue-700">
        <p>&copy; 2025 DreamNest Real Estate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
