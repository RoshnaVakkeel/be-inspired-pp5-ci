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
                /> Hi {currentUser?.username}
            </Link>
            <br />
            <Link
                className={`${styles.NavLink} p-2`}
                to={`/profiles/${currentUser?.profile_id}/edit`}
            >
                <i className="far fa-plus-square"></i> Profile
            </Link>
            <br />
            <Link
                className={`${styles.NavLink} p-2`}
                to="/posts/create"
            >
                <i className="far fa-plus-square"></i> Posts
            </Link>
            <br />
            <Link
                className={`${styles.NavLink} p-2`}
                to="/recommendations/create"
            >
                <i className="far fa-plus-square"></i> Recommendations
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
            className={`${appStyles.Content} ${mobile && styles.CollapsedColumn} mb-3 ${styles.CreatePanel}`}
        >
            <h4 className='text-center  mt-2'>Create and Inspire!</h4>
            <div><hr></hr></div>
            <div className='font-weight-bold '>
                {currentUser ? loggedInIcons : loggedOutIcons}
            </div>
        </Container>
    );
};

export default LeftPanel;