import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import AuthContext from '../authContext';
import { useContext } from 'react';
import constants from '../constants';

export default function Navigation() {
  const isAuthenticated = useContext(AuthContext);

  const navLinks = isAuthenticated === constants.authStatus.authenticated && (
    <>
      <LinkContainer to="/">
        <Nav.Link>Shorten URL</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/all-urls">
        <Nav.Link>All URLs</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/audit-logs">
        <Nav.Link>Audit Logs</Nav.Link>
      </LinkContainer>
    </>
  );

  return (
    <Navbar className="border-bottom">
      <Container>
        <Navbar.Brand>URL Shortener</Navbar.Brand>
        <Nav>{navLinks}</Nav>
      </Container>
    </Navbar>
  );
}
