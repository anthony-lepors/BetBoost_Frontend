import axios from 'axios';

// Add Request Cookies
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


// Defaut URL for requests
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Set CORS headers
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
