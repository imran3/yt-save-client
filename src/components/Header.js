import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
  const handleLogoClick = () => {
    window.location.href = window.location.href;
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="py-3">
      <Container>
        <Navbar.Brand>
          <a href={window.location.href} onClick={handleLogoClick}>
            <img
              src="/path/to/logo.png"
              alt="Logo"
              className="mr-2"
              style={{ height: '30px' }}
            />
            Website Name
          </a>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;


export { Header }