import React from 'react'
import {
    Container,
    Navbar,
    Nav,
  } from 'react-bootstrap';
import styles from "../styles/NavBar.module.css"


const NavBar = () => {
  return (
    <Navbar bg="warning" className="shadow p-3 mb-2 rounded"  expand="md" fixed="top">
      <Container className="p-2">
        <Navbar.Brand className={styles.NavBarBrand}href="#home">"Be Inspired"</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  id="basic-navbar-nav" className={styles.NavItems}>
          <Nav className="ml-auto text-left">
            <Nav.Link href="#home"><i class="fa fa-home" aria-hidden="true"></i> Home</Nav.Link>
            <Nav.Link href="#link"><i class="fa fa-user-plus" aria-hidden="true"></i>  Sign Up</Nav.Link>
            <Nav.Link href="#link"><i class="fa fa-sign-in-alt" aria-hidden="true"></i>  Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar