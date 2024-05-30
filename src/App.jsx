import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <div id="app" className="d-flex flex-column">
      <Navbar className="border-bottom">
        <Container>
          <Navbar.Brand>URL Shortener</Navbar.Brand>
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>Shorten URL</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/all-urls">
              <Nav.Link>All URLs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/audit-logs">
              <Nav.Link>Audit Logs</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
