import PropTypes from 'prop-types';
import { useContext } from 'react';
import authContext from '../authContext';
import { Navigate } from 'react-router-dom';
import constants from '../constants';
import LoadingMessage from './LoadingMessage';

const PrivateRoute = ({ children }) => {
    const authStatus = useContext(authContext);

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
