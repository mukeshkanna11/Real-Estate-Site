import React from 'react';

// AgentCard component to display detailed information about an agent
const AgentCard = ({ agent }) => {
  if (!agent) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-lg text-gray-500">Loading agent details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
      {/* Agent Name and Position */}
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800">{agent.name}</h3>
        <p className="text-sm text-gray-500">{agent.position || 'Real Estate Agent'}</p>
      </div>

      {/* Agent Contact Details */}
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Email: </span>
          <a
            href={`mailto:${agent.email}`}
            className="text-blue-500 underline transition duration-300 hover:text-blue-700"
          >
            {agent.email}
          </a>
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Phone: </span>
          <a
            href={`tel:${agent.phone}`}
            className="text-blue-500 underline transition duration-300 hover:text-blue-700"
          >
            {agent.phone}
          </a>
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Location: </span>
          {agent.location || 'Location not available'}
        </p>
      </div>

      {/* Agent Bio Section */}
      {agent.bio && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">About Me:</h4>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{agent.bio}</p>
        </div>
      )}

      {/* Social Links */}
      {agent.socialLinks && (
        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-semibold text-gray-800">Connect:</h4>
          <div className="flex space-x-4">
            {agent.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 transition duration-300 hover:text-blue-700"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 text-white transition duration-300 bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          onClick={() => alert('Contacting agent...')}
        >
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
