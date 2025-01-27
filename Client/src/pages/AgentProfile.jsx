import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Reusable Loading Screen
const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-500">{message}</p>
    </div>
  </div>
);

// Reusable Error Screen
const ErrorScreen = ({ message, onRetry }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <p className="text-lg text-red-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);

const AgentProfile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgentDetails = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        `https://real-estate-site-04db.onrender.com/api/agent/${id}`
      );
      setAgent(response.data);
    } catch (err) {
      setError('Failed to fetch agent details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError('Invalid agent ID.');
      setLoading(false);
      return;
    }

    fetchAgentDetails();
  }, [id]);

  if (loading) {
    return <LoadingScreen message="Loading agent details..." />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={fetchAgentDetails} />;
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
        <a
          href={`mailto:${agent.email}`}
          className="text-blue-500 hover:underline"
        >
          {agent.email}
        </a>
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Phone:</strong> {agent.phone || 'Not available'}
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          About {agent.name}
        </h2>
        <p className="p-4 mt-4 text-gray-700 bg-gray-100 rounded">
          {agent.bio || 'This agent does not have a bio yet.'}
        </p>
      </div>
    </div>
  );
};

export default AgentProfile;
