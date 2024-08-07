import './App.css';
import { Route, Routes } from 'react-router-dom';
import AllUrls from './routes/AllUrls';
import AuditLogs from './routes/AuditLogs';
import AuthProvider from './AuthProvider';
import Container from 'react-bootstrap/Container';
import Login from './routes/Login';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import ShortenUrl from './routes/ShortenUrl';

function App() {
  return (
    <div id="app" className="d-flex flex-column">
          <AuthProvider>
            <Navigation />
            <Container className="flex-grow-1 d-flex justify-content-center align-items-center flex-column">
              <Routes>
                <Route path="/" element={<PrivateRoute><ShortenUrl /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/all-urls" element={<PrivateRoute><AllUrls /></PrivateRoute>} />
                <Route path="/audit-logs" element={<PrivateRoute><AuditLogs /></PrivateRoute>} />
              </Routes>
            </Container>
          </AuthProvider>
        </div>
  );
}

export default App;
