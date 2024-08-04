import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import httpClient from './api/httpClient';
import authContext from './authContext';
import constants from './constants';

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(constants.authStatus.loading);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await httpClient.get('/api/v1/auth/status');

        if (response.status === 200) {
          setAuthStatus(constants.authStatus.authenticated);
        }
      } catch (error) {
        setAuthStatus(constants.authStatus.unauthenticated);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <authContext.Provider value={authStatus}>
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children:PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthProvider;
