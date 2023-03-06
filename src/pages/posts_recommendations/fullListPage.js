import React, { useEffect, useState } from "react";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/PostsListPage.module.css";
import appStyles from "../../App.module.css";

import PopularProfiles from "../profiles/PopularProfiles";

import { Col, Container, Form, Row } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { fetchMoreData } from '../../utils/utils';
import Post from '../posts/Post';
import Recommendation from '../recommendations/Recommendation';
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import LeftPanel from "../../components/LeftPanel";

/**
 * Renders combined PostsList and Recommendations List
 * Shows all the posts if no filters are applied
 * "Liked" Page: Shows the posts which user has liked 
 * "Feed" Page: Shows the lists of posts of the users that the logged in user follows 
 * Credits (for variables, functions) : Moments walkthrough and is adapted according to design
 */
function FullListPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [recommendations, setRecommendations] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const [query, setQuery] = useState('');

    /**
    * Fetches posts from the API.
    * Returns result based on search keywords.
    */
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };
        const fetchRecommendations = async () => {
            try {
                const { data } = await axiosReq.get(`/recommendations/?${filter}search=${query}`);
                setRecommendations(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);  // to limit the request to API request after 1.2 seconds  
        const timer = setTimeout(() => {
            fetchPosts();
            fetchRecommendations();
        }, 1200);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, pathname, currentUser, query]);

    return (
        <Container>
            <Row className="h-100 mt-5" xl={3} lg={2} md={2} sm={1}>
                <Col className="d-xl-block px-2" sm={12} md={4} lg={3} xl={3}>

                    <LeftPanel />
                </Col>

                <Col className="mx-auto px-2" sm={12} md={8} lg={8} xl={6}>

                    <PopularProfiles mobile />

                    {/* SearchBar */}
                    <Container className="p-0">
                        <i className={`fas fa-search ${styles.SearchIcon}`} />
                        <Form
                            className={`p-0 ${styles.SearchBar}`}
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <Form.Group controlId="search-bar">
                                <Form.Label className="d-none">Search bar</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="mr-sm-2"
                                    placeholder="Search posts or recommendations"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Container>

                    {hasLoaded ? (
                        <>
                            {posts.results.length ? (
                                <Container className="p-0">
                                    <hr />
                                    <div className={`text-center ${appStyles.Content}`}>Posts</div>
                                    <hr />
                                    <InfiniteScroll
                                        children={
                                            posts.results.map(post => (
                                                <Post key={post.id} {...post} setPosts={setPosts} />
                                            ))
                                        }
                                        dataLength={posts.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!posts.next}
                                        next={() => fetchMoreData(posts, setPosts)}
                                    />
                                    <hr />
                                    <div className={`text-center ${appStyles.Content}`}>Recommendations</div>
                                    <hr />
                                    <InfiniteScroll
                                        children={
                                            recommendations.results.map(recommendation => (
                                                <Recommendation key={recommendation.id} {...recommendation} setRecommendations={setRecommendations} />
                                            ))
                                        }
                                        dataLength={recommendations.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!recommendations.next}
                                        next={() => fetchMoreData(recommendations, setRecommendations)}
                                    />

                                </Container>
                            ) : (
                                <Container className={appStyles.Content}>
                                    <h2 className="text-center">No results</h2>
                                    <Asset src={NoResults} message={message} />
                                </Container>
                            )}
                        </>
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset spinner />
                        </Container>
                    )}


                </Col>

                <Col className="d-xl-block d-none" xl={3}>
                    <PopularProfiles />
                </Col>
            </Row>
        </Container>
    );

}
export default FullListPage;