import React, { createContext, useState, useEffect } from 'react';
import httpClient from './api/httpClient';

const AuthContext = createContext(false);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await httpClient.get('/api/v1/auth/status');

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
