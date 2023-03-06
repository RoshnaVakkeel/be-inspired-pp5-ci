import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Col, Container, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import LeftPanel from "../../components/LeftPanel";

/**
 * Renders the PostPage, detailed page of a selected post.
 * Credit and Guidance: Moments walkthrough
 * Codes have been adepated as per project design
 */
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] })
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row className="h-100 mt-5" xl={3} lg={2} md={2} sm={1}>
        <Col className="d-xl-block px-2" sm={12} md={4} lg={3} xl={3}>
          <LeftPanel />
        </Col>

        <Col className="mx-auto px-2" sm={12} md={8} lg={8} xl={6}>
          <PopularProfiles mobile />
          <Post
            {...post.results[0]}
            setPosts={setPost}
            postPage />

          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
            ) : comments.results.length ? (
              "Comments"
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser ? (
              <span>No comments yet, be the first to comment!</span>
            ) : (
              <span>No comments... yet</span>
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

export default PostPage;