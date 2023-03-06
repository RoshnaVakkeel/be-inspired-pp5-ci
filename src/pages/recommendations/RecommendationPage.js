import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import LeftPanel from "../../components/LeftPanel";
import PopularProfiles from "../profiles/PopularProfiles";

const RecommendationPage = () => {

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