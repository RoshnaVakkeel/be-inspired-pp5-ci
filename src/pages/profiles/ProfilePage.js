import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Post from "../posts/Post";
import Recommendation from '../recommendations/Recommendation';
import LeftPanel from "../../components/LeftPanel";

import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/DropdownMenu";

/**
 * Renders the ProfilePage component - displays the users' profile
 * Shows list of the posts and recommendations
 * Credits - CI's Moments Walkthrough
 */
function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [profileRecommendations, setProfileRecommendations] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  /**
 * Retrieves profile data from be-inspired-drf-api
 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profilePosts },
          { data: profileRecommendations },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`/recommendations/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setProfileRecommendations(profileRecommendations);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);


  const profilePageHeader = (
    <>
      <Row noGutters className="px-3 text-center">
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <hr />
          <Row className="justify-content-center no-gutters">
            <Col xs={4} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>

        <Col lg={12}>
          <p>Full Name: {profile?.name}</p>
          <p>Age Group: {profile?.age_group}</p>
          <p>Brief Bio: {profile?.brief_bio}</p>
        </Col>

        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button}`}
                onClick={() => { handleUnfollow(profile) }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => { handleFollow(profile) }}
              >
                Follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );



  const mainProfilePosts = (
    <>
      <hr />
      <Row className="justify-content-center no-gutters">
        <Col xs={4} className="text-center">
          <div>{profile?.posts_count}</div>
          <div>Posts</div>
        </Col>
        <Col xs={4} className="text-center">
          <div>{profile?.recommendations_count}</div>
          <div>Recommendations</div>
        </Col>
      </Row>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Container className="my-5" key={post.id}>
              <Post
                key={post.id} {...post}
                setPosts={setProfilePosts}
                profilePost
              />
            </Container>
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted any posts yet.`}
        />
      )}
      <hr />
      <div className="text-center fw-bold">{profile?.recommendations_count}</div>
      <div className="text-center">Recommendations</div>
      <hr />
      {profileRecommendations.results.length ? (
        <InfiniteScroll
          children={profileRecommendations.results.map((recommendation) => (
            <Container className="my-5" key={recommendation.id}>
              <Recommendation
                key={recommendation.id} {...recommendation}
                setRecommendations={setProfileRecommendations}
                profileRecommendation
              />
            </Container>
          ))}
          dataLength={profileRecommendations.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileRecommendations.next}
          next={() => fetchMoreData(profileRecommendations, setProfileRecommendations)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted any recommendations yet.`}
        />
      )}
    </>
  );

  return (
    <Container>
      <Row className="h-100 mt-5" xl={3} lg={2} md={2} sm={1}>
        <Col className="d-xl-block px-2" sm={12} md={4} lg={3} xl={3}>
          <LeftPanel />
        </Col>

        <Col className="mx-auto px-2" sm={12} md={8} lg={8} xl={6}>
          <PopularProfiles mobile />
          <Container className={appStyles.Content}>
            {hasLoaded ? (
              <>
                {profilePageHeader}
                {mainProfilePosts}
              </>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>

        <Col className="d-xl-block d-none" xl={3}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
}
export default ProfilePage;
