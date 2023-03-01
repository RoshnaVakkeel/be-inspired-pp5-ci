import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

/**
 * Renders the PostPage, detailed page of a selected post.
 * Credit: Moments walkthrough
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
            <Row>
                <Col>Left Panel</Col>

                <Col md={12} xl={7}>
                    <p>Popular profiles for mobile</p>

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

                <Col className="d-none d-lg-block p-0 p-lg-2">
                    Popular profiles for desktop

                </Col>
            </Row>
        </Container>
    );

}

export default PostPage;