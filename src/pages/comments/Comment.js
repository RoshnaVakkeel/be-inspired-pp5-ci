import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "../../styles/Comment.module.css";
import Avatar from '../../components/Avatar';

/**
 * Renders a selected Comment object from the API
 * Credit (variable, functions) - Moments walkthrough
 */
const Comment = (props) => {
    const {
        owner,
        profile_id,
        profile_image,
        content,
        updated_on,
    } = props;

    return (
        <div className={styles.Comment}>
          <hr />
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-left ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_on}</span>
              <p>{content}</p>
            </Media.Body>
          </Media>
        </div>
      );
    };
    

export default Comment