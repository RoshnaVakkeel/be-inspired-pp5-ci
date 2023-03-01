import React, { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../styles/Comment.module.css';
import Avatar from '../../components/Avatar';
import { DropdownMenu } from "../../components/DropdownMenu";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

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

  /** 
   * Handles deleting comment based on its id
    */
  const handleDelete = async () => {
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
    } catch (err) { }
  };

  return (
    <div className={styles.Comment}>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-left ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>|{updated_on}</span>
          <span className={styles.DropdownDots}>
            {/* Display the dropdown menu to owner of the comment
                  to allow them to edit or delete it */}
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
              />
            ) : (
              <p className="pr-2 pt-2">{content}</p>
            )}
        </Media.Body>
      </Media>
    </div>
  );
};


export default Comment