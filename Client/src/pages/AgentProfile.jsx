import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AgentProfile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid agent ID.');
      setLoading(false);
      return;
    }

    const fetchAgentDetails = async () => {
      try {
        console.log('Fetching details for agent ID:', id); // Debug log
        const response = await axios.get(`https://real-estate-site-04db.onrender.com/api/agent/${id}`);
        setAgent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching agent details:', err);
        setError('Failed to fetch agent details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading agent details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Agent not found.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl px-6 py-8 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800">{agent.name}</h1>
      <p className="mt-4 text-gray-600">
        <strong>Email:</strong>{' '}
        <a href={`mailto:${agent.email}`} className="text-blue-500 hover:underline">
          {agent.email}
        </a>
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Phone:</strong> {agent.phone || 'Not available'}
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">About {agent.name}</h2>
        <p className="p-4 mt-4 text-gray-700 bg-gray-100 rounded">
          {agent.bio || 'This agent does not have a bio yet.'}
        </p>
      </div>
    </div>
  );
};

export default AgentProfile;
