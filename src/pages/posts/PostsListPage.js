import React, { useEffect, useState } from "react";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/PostsListPage.module.css";
import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';



import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Post from "./Post";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 700);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, pathname, currentUser, query]);

    return (
        <Container>
            <Row className="h-100">
                <Col>Left Panel</Col>

                <Col md={12} xl={8}>
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
                                posts.results.map((post) => (
                                    <Post key={post.id} {...post} setPosts={setPosts} />
                                ))
                            ) : (
                                <Container className={appStyles.Content}>
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

                <Col className="d-none d-lg-block p-0 p-lg-2">
                    Popular profiles for desktop

                </Col>
            </Row>
        </Container>
    );

}
export default PostsListPage;