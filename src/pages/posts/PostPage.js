import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import Post from "./Post";

/**
 * Renders the PostPage, detailed page of a selected post.
 * Credit: Moments walkthrough
 */
function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] })

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                ]);
                setPost({ results: [post] });
                console.log(post);
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

                <Col  sm={8}>
                    <p>Popular profiles for mobile</p>

                    <Post
                        {...post.results[0]}
                        setPosts={setPost}
                        postPage />

                    <Container className={appStyles.Content}>
                        Comments
                    </Container>

                </Col>

                <Col  className="d-none d-lg-block p-0 p-lg-2">
                    Popular profiles for desktop

                </Col>
            </Row>
        </Container>
    );

}

export default PostPage;