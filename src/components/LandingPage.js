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
                    </Col>
                    <Col lg={6} sm={12}>
                        <div className="text-center mt-5 " >
                            <h3 className="mb-4">Welcome to "Be Inspired" <br/> Your very own inspiration sharing platform</h3>

                            <h4> If you are looking for an inspiration from around or wish to inspire others.
                                This is the right place for you!!
                            </h4>
                            <p>Join our community! Start an inspirational journey!!</p>
                            <Link to="/signup">
                                <Button
                                    className={`${styles.Button} mx-3 mb-3`}
                                >
                                    New? Come Join us!
                                </Button>
                            </Link>
                            <Link to="/Signin">
                                <Button className={`${styles.Button} mb-3`}>
                                    Member? Sign In and Start!
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <footer className={styles.footer}>
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