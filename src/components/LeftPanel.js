import React from 'react';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import styles from '../styles/LeftPanel.module.css';
import appStyles from "../App.module.css";
import { useCurrentUser } from '../contexts/CurrentUserContext';


/**
 * Panel that is displayed on the left of the page next to the main content
 */
const LeftPanel = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = (

        <>

            <Link
                className={styles.NavLink}
                to="/posts/create"
            >
                <i className="far fa-plus-square"></i>Create Post
            </Link>
        </>
    );

    const loggedOutIcons = (
        <>
            <p>Unlock <a href="/signup"><i className="fa-solid fa-lock"></i></a> and inspire..</p>
            <p>Or use the key <a href="/signin"><i className="fa-solid fa-key"></i></a></p>
        </>
    );

    return (
        <Container
            className={`${appStyles.Content} ${styles.CollapsedColumn} mb-2 ${styles.CreatePanel}`}
        >
            {currentUser ? loggedInIcons : loggedOutIcons}
        </Container>
    );
};

export default LeftPanel;