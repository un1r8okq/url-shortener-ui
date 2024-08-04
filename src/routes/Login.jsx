import { useContext } from 'react';
import LoginButton from '../components/LoginButton';
import authContext from '../authContext';
import constants from '../constants';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const authStatus = useContext(authContext);

    if (authStatus === constants.authStatus.authenticated) {
        return <Navigate to="/" />;
    }

    return <>
        <p>You must login to access this page.</p>
        <LoginButton />
    </>;
};

export default Login;
