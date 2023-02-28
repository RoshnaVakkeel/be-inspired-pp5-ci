import React, { useEffect, useState } from "react";
import NoResults from "../../assets/no-results.png";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

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

    /**
    * Fetches posts from the API.
    * Returns result based on search keywords.
    */
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchPosts();
    }, [filter, pathname, currentUser]);

    return (
        <Container>
            <Row className="h-100">
                <Col>Left Panel</Col>

                <Col sm={8}>
                    <p>Popular profiles for mobile</p>
                    

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