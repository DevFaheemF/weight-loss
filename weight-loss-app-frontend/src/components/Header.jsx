import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Weight Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="weekly-summary" smooth={true} duration={500}>
              <Button variant="dark" className="ms-2">
                Weekly Summary
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
