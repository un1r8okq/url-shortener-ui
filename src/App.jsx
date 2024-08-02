import './App.css';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import Navigation from './components/Navigation';

function App() {
  return (
    <div id="app" className="d-flex flex-column">
      <AuthProvider>
        <Navigation />
        <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Outlet />
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
