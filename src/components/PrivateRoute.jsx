import LoadingMessage from './LoadingMessage';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import authContext from '../authContext';
import constants from '../constants';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { authStatus } = useContext(authContext);

    switch (authStatus) {
        case constants.authStatus.loading:
            return <LoadingMessage message='Checking that you are authenticated' />;
        case constants.authStatus.unauthenticated:
            return <Navigate to="/login" />;
        case constants.authStatus.authenticated:
            return children;
    }
};

PrivateRoute.propTypes = {
    children:PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default PrivateRoute;
