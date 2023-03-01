import React, { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../styles/Comment.module.css';
import Avatar from '../../components/Avatar';
import { DropdownMenu } from "../../components/DropdownMenu";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

import FeedbackMsg from "../../components/Feedbackmsg";

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
    id,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  /** 
   * Handles deleting comment based on its id
   * Reduces the total number of comments by 1
   * Credit - Moments walkthrough, CI course material
    */
  const handleDelete = async () => {
    setIsDeleted(true);
    setTimeout(async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) { 
        console.log(err)
      }
    }, 1500);
  };

  /**
   * Alert Feedback messages upon post delete
   * Credit - https://github.com/aleksandracodes/ci_pp5_snapfood/
   */
  return isDeleted ? (
    <FeedbackMsg variant="info" message="Comment has been successfully deleted" />
  ) : (
    <div className={styles.Comment}>
      {showAlert && (
        <FeedbackMsg />
      )}

      <Media>
        <Link to={`/profiles/${profile_id}`} className="my-3">
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center mb-4">
          <div className={styles.CommentBox}>
            <span className={styles.OwnerName}>{owner}</span>
            <span className={styles.Date}> | {updated_on}</span>
            <span className={styles.DropdownDots}>
              {/* Display the dropdown menu for owner of the comment
                  to either edit or delete it */}
              {is_owner && !showEditForm && (
                <DropdownMenu
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleDelete}
                />
              )}
            </span>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
                setShowAlert={setShowAlert}
              />
            ) : (
              <p className="pr-2 pt-2">{content}</p>
            )}
          </div>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment