import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const AgentProfile = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [agent, setAgent] = useState(null); // State to store the agent data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch agent details from backend using Axios
        const response = await axios.get(`https://real-estate-site-04db.onrender.com/api/agent/${id}`);
        setAgent(response.data); // Set the agent data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch agent details'); // Handle any errors
        setLoading(false); // Set loading to false even if there’s an error
      }
    };
    fetchData();
  }, [id]); // Dependency array ensures the fetch is triggered when the agent ID changes

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error message if any

  return (
    <div className="container p-4 mx-auto">
      <h2 className="text-xl font-bold">{agent.name}</h2>
      <p>Email: {agent.email}</p>
      <p>Phone: {agent.phone}</p>
      <p>Bio: {agent.bio}</p> {/* Assuming there’s a bio field */}
    </div>
  );
};

export default AgentProfile;
