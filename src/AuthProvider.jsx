import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import authContext from './authContext';
import constants from './constants';
import httpClient from './api/httpClient';

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(constants.authStatus.loading);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await httpClient.get('/auth/status');

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
