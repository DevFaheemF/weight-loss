
import { Container } from 'react-bootstrap';
import Navbar from '../components/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar/>
      <Container className="my-4">
        {children} 
      </Container>
    </>
  );
};

export default Layout;
