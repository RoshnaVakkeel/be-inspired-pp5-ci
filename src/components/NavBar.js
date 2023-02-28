import React from 'react'
import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";

import axios from 'axios';

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hook/useClickOutsideToggle';


/**
 * Returns the navigation bar.
 * Codes credit: CI's Moments walkthrough - Modified to fit the features
 */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  console.log(currentUser)

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>Create Post
    </NavLink>
  );


  const loggedInIcons = (
    <>
      <NavLink
        to="/Recommendations"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa fa-star" aria-hidden="true"></i>
        Recommendation
      </NavLink>
      <NavLink
        to="/feed"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa fa-rss-square" aria-hidden="true"></i>
        Feed
      </NavLink>

      <NavLink
        to="/Liked"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa fa-heart" aria-hidden="true"></i>
        Liked
      </NavLink>

      <NavLink to="/"
        className={styles.NavLink}
        onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>
        Sign out
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image}
          text="Profile"
          height={33}
        />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>
        Sign up
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>
        Sign in
      </NavLink>

    </>
  );

  return (
    <Navbar
      expanded={expanded}
      bg="warning"
      className="shadow p-3 mb-2 rounded"
      expand="md"
      fixed="top">
      <Container className="p-2">
        <NavLink to="/">
          <Navbar.Brand className={styles.NavBarBrand}>
            "Be Inspired"
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={styles.NavItems}>
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/" >
              <i className="fa fa-home" aria-hidden="true"></i>
              Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar