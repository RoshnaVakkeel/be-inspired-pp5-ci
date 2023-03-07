
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Recommendation from "./Recommendation";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";

import LeftPanel from "../../components/LeftPanel";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";

/**
 * Renders the RecommendationPage, detailed page of a selected Recommendation.
 */

const RecommendationPage = () => {
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [recommendation, setRecommendation] = useState({ results: [] });
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recommendation}, { data: comments}] = await Promise.all([
                    axiosReq.get(`/recommendations/${id}`),
                    axiosReq.get(`/comments/?recommendation=${id}`),
                ]);
                setRecommendation({ results: [recommendation] });
                setComments(comments);
                // console.log(recommendation);
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
              <Recommendation
                {...recommendation.results[0]}
                setRecommendations={setRecommendation}
                recommendation />
    
              <Container className={appStyles.Content}>
                {currentUser ? (
                  <CommentCreateForm
                    profile_id={currentUser.profile_id}
                    profileImage={profile_image}
                    recommendation={id}
                    setRecommendation={setRecommendation}
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
                        setRecommendation={setRecommendation}
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
    
export default RecommendationPage