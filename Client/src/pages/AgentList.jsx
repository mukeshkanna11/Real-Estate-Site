import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://real-estate-site-04db.onrender.com/api/agent');
      setAgents(response.data);
    } catch (err) {
      console.error('Error fetching agents:', err);
      setError('Failed to load agents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleContactAgent = (agentName) => {
    toast.success(
      <div>
        <p>Agent {agentName} will connect with you soon!</p>
        <div className="mt-2 text-center">
          <FaUserAlt className="w-12 h-12 mx-auto text-gray-500" />
        </div>
      </div>,
      {
        position: 'top-right',
        autoClose: 5000,
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiOutlineLoading3Quarters className="w-12 h-12 text-gray-500 animate-spin" />
        <p className="ml-4 text-lg text-gray-500">Loading agents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <MdErrorOutline className="w-12 h-12 text-red-500" />
        <p className="mt-4 text-lg text-center text-red-500">{error}</p>
        <button
          onClick={fetchAgents}
          className="px-4 py-2 mt-6 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">No agents available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container p-8 mx-auto mt-12">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
        Meet Our Trusted Agents
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <div
            key={agent._id || index}
            className="flex flex-col p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <div className="flex flex-col items-center flex-grow">
              {/* Replacing image with icon */}
              <FaUserAlt className="w-32 h-32 mb-4 text-gray-500" />

              <h3 className="text-xl font-semibold text-gray-800">{agent.name}</h3>
              <p className="mb-4 text-sm text-gray-600">{agent.position || 'Real Estate Agent'}</p>
              <p className="text-sm text-gray-800">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${agent.email}`} className="text-blue-500 underline">
                  {agent.email}
                </a>
              </p>
              <p className="text-sm text-gray-800">
                <strong>Phone:</strong> {agent.phone}
              </p>

              {/* More information about agent */}
              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <strong>Bio:</strong> {agent.bio || 'A real estate expert with a passion for client satisfaction.'}
                </p>
                <p className="mt-2">
                  <strong>Experience:</strong> {agent.experience || 'Years of experience in various fields of real estate.'}
                </p>
                <p className="mt-2">
                  <strong>Languages:</strong> {agent.languages || 'English'}
                </p>
              </div>
            </div>

            {/* Aligning the "Contact Agent" button at the bottom */}
            <div className="mt-5">
              <button
                onClick={() => handleContactAgent(agent.name)}
                className="w-full px-4 py-2 text-white transition duration-200 bg-green-600 rounded hover:bg-green-700"
              >
                Contact Agent
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AgentList;
