import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import landingImage from "../assets/landing_page_img.jpg";
import styles from "../styles/LandingPage.module.css";

/** 
 * Landing page with information about the App
 * Prompts user to sign up/sign in
 * Gives instructions on how to he started
*/
const LandingPage = () => {
    return (
        <>
            <Container className="fluid">
                <Row className="text-center mt-5" lg={2} md={1}>
                    <Col lg={6} sm={12}>
                        <img
                            src={landingImage}
                            className={styles.LandingImage}
                            alt="Person holding lantern at dawn"
                        />
                        <p>
                            {' '}
                            <strong> “As we work to create light for others, we naturally light our own way." </strong><br />
                            --Mary Anne Radmacher{' '}
                        </p>
                    </Col>
                    <Col lg={6} sm={12}>
                        <div className="text-center mt-3" >
                            <h4 className="mb-3">Welcome to "Be Inspired" <br /> Your very own inspiration sharing platform</h4>

                            <h5> Are looking for an inspiration or you wish to inspire others?
                                Then this is the right place for you!!
                            </h5>
                            <br />
                            <h6>Our easy to use features allow you to access all the posts (Homepage), Recommendations,
                                follow the inspirers and see their posts in your feed, and save liked posts in liked page.</h6>
                                <p>You can share a post and also recommend people what inspires them to
                                embrace positivity in their lives.</p>
                            <p><strong>Feeling Inspired? Come join our community! Start your inspirational journey!!</strong></p>
                            <Link to="/signup">
                                <Button
                                    className={`${styles.Button} mx-3 mb-2`}
                                >
                                    New here? Join us!
                                </Button>
                            </Link>
                            <Link to="/Signin">
                                <Button className={`${styles.Button} mb-2`}>
                                    Member? Sign In and Start!
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <footer className={`${styles.footer}`}>
                        <div className="text-center">
                            <p>For Education Purposes only! || Creator: Roshna Vakkeel</p>
                            <a
                                href="https://github.com/RoshnaVakkeel/be-inspired-pp5-ci"
                                aria-label="Check the website GitHub page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-github" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/roshna-vakkeel/"
                                aria-label="Visit me on LinkedIn (opens in new tab)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin" />
                            </a>
                        </div>
                    </footer>
                </Container>
            </Container>
        </>
    );
};

export default LandingPage