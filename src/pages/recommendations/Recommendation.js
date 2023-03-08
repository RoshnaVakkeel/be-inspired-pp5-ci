import React, { useState } from 'react'
import styles from '../../styles/Recommendation.module.css'

import FeedbackMsg from '../../components/Feedbackmsg';

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';
import { DropdownMenu } from "../../components/DropdownMenu";

/**
 * Renders a selected Recommendation object from the API
 * Guidance - Moments walkthrough
 */

const Recommendation = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    category,
    price_category,
    description,
    reason,
    comments_count,
    likes_count,
    like_id,
    image,
    updated_on,
    setRecommendations,
} = props;

/** 
     * For user authentication
     * To restrict owner of the recommendation not to like their own 
     * */
const currentUser = useCurrentUser();
const is_owner = currentUser?.username === owner;
const history = useHistory();
const [showAlert, setShowAlert] = useState(false);

/** 
 * To like a recommendation by the user
 * Sends a request to the API 
 * Increases likes number by 1
*/
const handleLike = async () => {
    try {
        const { data } = await axiosRes.post('/likes/', { recommendation: id });
        setRecommendations((prevRecommendations) => ({
            ...prevRecommendations,
            results: prevRecommendations.results.map((recommendation) => {
                return recommendation.id === id
                    ? { ...recommendation, likes_count: recommendation.likes_count + 1, like_id: data.id }
                    : recommendation;
            }),
        }));
    } catch (err) {
        // console.log(err);
    }
};

/** 
* To unlike a recommendation by the user who liked it
* Sends a request to the API 
* Decreases likes number by 1
*/
const handleUnlike = async () => {
    try {
        await axiosRes.delete(`/likes/${like_id}`);
        setRecommendations((prevRecommedations) => ({
            ...prevRecommedations,
            results: prevRecommedations.results.map((recommendation) => {
                return recommendation.id === id
                    ? { ...recommendation, likes_count: recommendation.likes_count - 1, like_id: null }
                    : recommendation;
            }),
        }));
    } catch (err) {
        // console.log(err);
    }
};

/*
Handles editing of the recommendation
*/
const handleEdit = () => {
    history.push(`/recommendations/${id}/edit`);
};

/**
  * Handles deleting of the recommendation
  * Shows Alert message when the recommendation is deleted
  * Redirects the user to the main page over a second
*/
const handleDelete = async () => {
    try {
        await axiosRes.delete(`/recommendations/${id}/`);
        setShowAlert(true);
        setTimeout(function () {
            history.goBack();
        }, 1500);
    } catch (err) {
        // console.log(err);
    }
};


  return (
    <Card className={styles.Recommendation}>
    {showAlert && (
        <FeedbackMsg variant="info" message="Your recommendation has been successfully deleted.." />
    )}
    <Card.Body>
        <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={55} />
                {owner}
            </Link>
            <div className="d-flex align-items-center">
                <span>{updated_on}</span>
                {is_owner && setRecommendations && (
                        <DropdownMenu 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                        />
                    )}
            </div>
        </Media>
    </Card.Body>
    <Link to={`/recommendations/${id}`}>
        <Card.Img src={image} alt={title} />
    </Link>
    <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {category && <Card.Title className="text-center">Category: {category}</Card.Title>} 
        {price_category && <Card.Title className="text-center">Price Category: {price_category}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        {reason && <Card.Text>{reason}</Card.Text>}
        <div>
            {is_owner ? (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>
                        You can't like your own recommendation!
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
                        Log in to like recommendations!
                    </Tooltip>}
                >
                    <i className="far fa-heart" />
                </OverlayTrigger>
            )}
            {likes_count}
            <Link to={`/recommendations/${id}`}>
                <i className="far fa-comments" />
            </Link>
            {comments_count}
        </div>
    </Card.Body>
</Card>
);
};

export default Recommendation