import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media,  OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

/**
 * Renders a selected Post object from the API
 * Credit (variable, functions) - Moments walkthrough
 */
const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        title,
        description,
        category,
        comments_count,
        likes_count,
        like_id,
        image,
        updated_on,
        postPage,
    } = props;

    /** 
     * For user authentication
     * To restrict owner of the post not to like their on post 
     * */
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;


    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_on}</span>
                        {is_owner && postPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {category && <Card.Title className="text-center">Category: {category}</Card.Title>}
                {description && <Card.Text>{description}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={() => { }}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => { }}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;

