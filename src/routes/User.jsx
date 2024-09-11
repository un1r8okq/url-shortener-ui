import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import LoadingMessage from '../components/LoadingMessage';
import { Navigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

/**
 * @typedef {import('../api/apiClient').UserResponse} User
 */

export default function User() {
  /** @type {[String, React.Dispatch<String>]} */
  const [error, setError] = useState('');
  /** @type {[Boolean, React.Dispatch<Boolean>]} */
  const [isLoading, setLoading] = useState(true);
  /** @type {[?User, React.Dispatch<?User>]}  */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      setUser(null);
      try {
        const user = await apiClient.getAuthenticatedUser();
        setUser(user);
        setError('');
        setLoading(false);
      } catch (error) {
        setError(
          'Something went wrong when fetching the current authenticated user. Please try again later.',
        );
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await apiClient.logout();
    await apiClient.getAuthenticatedUser();
  };

  const getContent = () => {
    if (error !== '') {
      return <Alert variant="danger">{error}</Alert>;
    }

    if (isLoading) {
      return <LoadingMessage message='Loading current user' />;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <p>Hey {user.name}.</p>
        <Button onClick={logout} className='d-inline'>Click here to logout</Button>
      </>
    );
  };

  return <div className="h-100 d-flex flex-column">
    <div className="flex-grow-1 d-flex justify-content-center flex-column align-items-center">
      {getContent()}
    </div>
  </div>;
}
