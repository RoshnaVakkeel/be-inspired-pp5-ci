import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Image, Button } from "react-bootstrap";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);


  const profilePageHeader = (
    <>
      {profile?.is_owner && <DropdownMenu id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>Posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>

        <Col lg={12}>
          <p>Full Name: {profile?.name}</p>
          <p>Brief Bio: {profile?.brief_bio}</p>
        </Col>

        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => {}}
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
      <p className="text-center">Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Container>
      <Row className="h-100 mt-5">
        <Col >Left Panel</Col>

        <Col md={11} xl={7} className="mt-2">
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

        <Col xl={3} className="d-none d-xl-block pt-2">
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
}
export default ProfilePage;
