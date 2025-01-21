import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// You can import a custom icon or use a free icon library like Font Awesome
import { FaUserAlt } from 'react-icons/fa'; 

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://real-estate-site-04db.onrender.com/api/agent');
        setAgents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to load agents.');
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleContactAgent = (agentName) => {
    toast.success(
      <div>
        <p>Agent will connect with you soon!</p>
        <div className="mt-2 text-center">
          <FaUserAlt className="w-12 h-12 mx-auto text-gray-500" />
        </div>
      </div>,
      {
        position: 'top-right',  // Using string instead of toast.POSITION.TOP_RIGHT
        autoClose: 5000,
      }
    );
  };  

  if (loading) {
    return <p className="text-center text-gray-500">Loading agents...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (agents.length === 0) {
    return <p className="text-center text-gray-500">No agents available at the moment.</p>;
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
