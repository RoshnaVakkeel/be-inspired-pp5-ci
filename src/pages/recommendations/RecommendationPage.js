
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import LeftPanel from "../../components/LeftPanel";
import PopularProfiles from "../profiles/PopularProfiles";

/**
 * Renders the RecommendationPage, detailed page of a selected Recommendation.
 */

const RecommendationPage = () => {
    const { id } = useParams();
    const [recommendation, setRecommendation] = useState({ results: [] });
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
                </Col>

                <Col className="d-xl-block d-none" xl={3}>
                    <PopularProfiles />

                </Col>
            </Row>
        </Container>
    );
}
export default RecommendationPage