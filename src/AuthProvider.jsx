import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiClient from './api/apiClient';
import authContext from './authContext';
import constants from './constants';

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(constants.authStatus.loading);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiClient.getAuthenticatedUser('/auth/user');

        if (response) {
          setAuthStatus(constants.authStatus.authenticated);
        }
      } catch (error) {
        setAuthStatus(constants.authStatus.unauthenticated);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = () => {
    setAuthStatus(constants.authStatus.unauthenticated);
  };

  return (
    <authContext.Provider value={{ authStatus, logout }}>
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
