import React from 'react'
import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar bg="warning" className="shadow p-3 mb-2 rounded" expand="md" fixed="top">
      <Container className="p-2">
        <NavLink to="/">
          <Navbar.Brand className={styles.NavBarBrand} href="#home">
            "Be Inspired"
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.NavItems}>
          <Nav className="ml-auto text-left">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/" href="#home">
              <i class="fa fa-home" aria-hidden="true"></i>
              Home
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup" href="#link">
              <i class="fa fa-user-plus" aria-hidden="true"></i>
              Sign Up
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin" href="#link">
              <i class="fa fa-sign-in-alt" aria-hidden="true"></i>
              Sign In
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar