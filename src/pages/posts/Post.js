import React, { useState } from 'react'
import styles from '../../styles/Post.module.css'
import { DropdownMenu } from "../../components/DropdownMenu";
import FeedbackMsg from '../../components/Feedbackmsg';

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';


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
        setPosts,
    } = props;

    /** 
     * For user authentication
     * To restrict owner of the post not to like their on post 
     * */
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);

    /** 
     * To like a post by the user
     * Sends a request to the API 
     * Increases likes number by 1
    */
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    /** 
   * To unlike a post by the user who liked it
   * Sends a request to the API 
   * Decreases likes number by 1
  */
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    /*
  Handles editing of the post
*/
    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    /**
      * Handles deleting of the post
      * Shows Alert message when the post is deleted
      * Redirects the user to the main page in a second
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            setShowAlert(true);
            
            setTimeout(function () {
                history.push("/");
            }, 1500);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Card className={styles.Post}>
            {showAlert && (
                <FeedbackMsg variant="info" message="Your post has been successfully deleted.." />
            )}
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_on}</span>
                        {is_owner && postPage && <DropdownMenu
                            handleEdit={handleEdit}
                            handleDelete={handleDelete} />}
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
                            overlay={<Tooltip>
                                You can't like your own post!
                            </Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>
                                Log in to like posts!
                            </Tooltip>}
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

