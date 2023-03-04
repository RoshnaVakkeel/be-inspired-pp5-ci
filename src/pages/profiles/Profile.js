import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/Profile.module.css';
import btnStyles from '../../styles/Button.module.css';

import Button from 'react-bootstrap/Button';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { useSetProfileData } from '../../contexts/ProfileDataContext';


/**
 * /**
 * Displays profile avatar to all and follow/unfollow buttons upon signing in
 * Shows follow button who the user isn't following
 * Shows unfollow buttons to users when signed in
 * Credit CI's Moments walthrough project for the variables and logic
 */
const Profile = (props) => {
    const {profile, mobile, imageSize=50} = props;
    const {id, following_id, image, owner} = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const { handleFollow } = useSetProfileData();


  return (
    <div className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}>
        <div>
            <Link className='align-self-center' to={`/profiles/${id}`}>
                <Avatar src={image} height={imageSize} />
            </Link>
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
            <p>{owner}</p>
        </div>
        <div className={`text-right ${!mobile && 'ml-auto'}`}>
            {!mobile && currentUser && !is_owner && (
                following_id ? (
                    <Button 
                        className={btnStyles.Button}
                        onClick={() => {}}
                    >
                        Unfollow
                    </Button>
                ) : (
                    <Button 
                        className={btnStyles.Button}
                        onClick={ handleFollow(profile)}
                    >
                        Follow
                    </Button>
                )
            )}
        </div>
    </div>
  )
};

export default Profile