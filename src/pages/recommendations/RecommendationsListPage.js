import React, { useState } from "react";

import { Badge, Col, Container, Form, Row } from "react-bootstrap";

import styles from "../../styles/RecommendationsListPage.module.css";
import appStyles from "../../App.module.css";

import LeftPanel from "../../components/LeftPanel";
import PopularProfiles from "../profiles/PopularProfiles";

/**
 * Renders Recommendations List - 
 * Shows all the Recommendations if no filters are applied
 * "Liked" Page: Shows the Recommendations which user has liked 
 * "Feed" Page: Shows the lists of Recommendations of the users that the logged in user follows 
 * Guidance: Moments walkthrough and codes are adapted according to design
 */
const RecommendationsListPage = () => {
    const [recommendations, setRecommendations] = useState({ results: [] });
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(null);

    return (
        <Container>
            <Row className="h-100 mt-5" xl={3} lg={2} md={2} sm={1}>
                <Col className="d-xl-block px-2" sm={12} md={4} lg={3} xl={3}>
                    <LeftPanel />
                    <Container
                        className={`${appStyles.Content} mt-3 mb-3`}
                    >
                        <h4 className={`${styles.Header} text-center mt-2`}> Categories</h4>
                        <hr />
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Books")}>Books</Badge>
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Music")}>Music</Badge>
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Person")}>Person</Badge>
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Place")}>Place</Badge>
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Art")}>Art</Badge>
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Event")}>Event</Badge>
                        <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Movies")}>Movies</Badge>
                    </Container>
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
                                    placeholder="Search recommendations"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Container>
      
                </Col>

                <Col className="d-xl-block d-none" xl={3}>
                    <PopularProfiles />
                </Col>
            </Row>
        </Container>
    );
}
export default RecommendationsListPage;