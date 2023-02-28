import React from "react";


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";


function PostsListPage() {
  
    return (
        <Container>
            <Row className="h-100">
                <Col>Left Panel</Col>

                <Col  sm={8}>
                    <p>Popular profiles for mobile</p>

                    
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
export default PostsListPage;