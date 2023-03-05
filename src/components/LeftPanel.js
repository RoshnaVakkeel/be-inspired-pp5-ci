import React from 'react';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import styles from '../styles/LeftPanel.module.css';
import appStyles from "../App.module.css";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';


/**
 * Panel that is displayed on the left of the page next to the main content
 */
const LeftPanel = ({ mobile }) => {
    const currentUser = useCurrentUser();

    const loggedInIcons = (

        <>
            <Link
                className={styles.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar src={currentUser?.profile_image}
                    text=""
                    height={33}
                />
                {currentUser?.username}'s Profile
            </Link>
            <br />
            <Link
                className={`${styles.NavLink} p-2`}
                to="/posts/create"
            >
                <i className="far fa-plus-square"></i>Create Post
            </Link>
            <br />
            <Link
                className={`${styles.NavLink} p-2`}
                to="/recommendations/create"
            >
                <i className="far fa-plus-square"></i>Create Recommendations
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
            className={`${appStyles.Content} ${mobile && styles.CollapsedColumn} mb-2 ${styles.CreatePanel}`}
        >
            <h4 className='text-center py-2'>Create to Inspire!</h4>
            <div>
                {currentUser ? loggedInIcons : loggedOutIcons}
            </div>
        </Container>
    );
};

export default LeftPanel;