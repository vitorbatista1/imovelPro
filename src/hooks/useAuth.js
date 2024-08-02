import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists and is valid (this is just a basic example)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Add more validation as needed
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return { isAuthenticated };
}
