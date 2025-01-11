import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAgents } from '../api';

const AgentProfile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAgents();
      const selectedAgent = data.find((agent) => agent._id === id);
      setAgent(selectedAgent);
    };
    fetchData();
  }, [id]);

  if (!agent) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">{agent.name}</h2>
      <p>Email: {agent.email}</p>
      <p>Phone: {agent.phone}</p>
      <p>{agent.bio}</p>
    </div>
  );
};

export default AgentProfile;
