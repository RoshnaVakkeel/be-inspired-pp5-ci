import React, { useEffect, useState } from "react";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/PostsListPage.module.css";
import appStyles from "../../App.module.css";

import PopularProfiles from "../profiles/PopularProfiles";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';

import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { fetchMoreData } from '../../utils/utils';
import Post from "./Post";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";

/**
 * Renders PostsList - 
 * Shows all the posts if no filters are applied
 * "Liked" Page: Shows the posts which user has liked 
 * "Feed" Page: Shows the lists of posts of the users that the logged in user follows 
 * Credits (for variables, functions) : Moments walkthrough and is adapted according to design
 */
function PostsListPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
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
                console.log(err);
            }
        };

        setHasLoaded(false);  // to limit the request to API request after 1.2 seconds  
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1200);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, pathname, currentUser, query]);

    return (
        <Container>
            <Row className="h-100 mt-5">
                <Col>Left Panel</Col>

                <Col md={12} xl={7}>
                    <p>Popular profiles for mobile</p>

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
                                    placeholder="Search posts"
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

                    <Container className={appStyles.Content}>
                        Comments
                    </Container>

                </Col>

                <Col xl={3} className="d-none d-xl-block pt-2">
                    <PopularProfiles />
                </Col>
            </Row>
        </Container>
    );

}
export default PostsListPage;