const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://r-yarnr-yarn-server.onrender.com';

if (!import.meta.env.VITE_API_BASE_URL && window.location.hostname !== 'localhost') {
    console.warn("⚠️ API_URL is using local fallback but application is running on " + window.location.hostname + ". Please set VITE_API_BASE_URL in your Vercel Environment Variables.");
}

export default API_URL;
