// API Configuration
// When VITE_API_URL is not set, construct URL based on current host
// This allows the app to work when accessed from different devices on the network
const getApiBaseUrl = () => {
  // If explicitly set in .env, use that
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Otherwise, use the current host but with port 8000 (FastAPI port)
  // This works when both containers are on the same machine
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    return `${protocol}//${hostname}:8000`
  }
  
  // Fallback for SSR or build time
  return 'http://localhost:8000'
}

export const API_BASE_URL = getApiBaseUrl()
