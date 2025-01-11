import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProperties = () => API.get('/properties');
export const fetchPropertyDetails = (id) => API.get(`/properties/${id}`);
export const fetchAgents = () => API.get('/agents');
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);

export default API;
