import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams, } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import FeedbackMsg from "../../components/Feedbackmsg";

/**
 * Form to change password
 * Credit- CI's Moments Walkthrough. Modified as per need.
 */
const ProfilePasswordChange = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });
    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    /**
     * Populate empty variable strings
     */
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            // redirects user if they are not the owner of this profile
            history.push("/");
        }
    }, [currentUser, history, id]);

    /**
     * Update Gamer Verse API with new password data
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/dj-rest-auth/password/change/", userData);
            setShowAlert(true);
            setTimeout(function () {
                history.push("/");
            }, 1500);
        } catch (err) {
            // console.log(err);
            setErrors(err.response?.data);
        }
    };

    /**
     * Update password form
     */
    return (
        <Row>
            <Col className="py-5 mx-auto text-center" md={6}>
                {showAlert && (
                    <FeedbackMsg
                        variant="success" 
                        message="Password changed successfully.."
                    />
                )}
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                placeholder="new password"
                                type="password"
                                value={new_password1}
                                onChange={handleChange}
                                name="new_password1"
                            />
                        </Form.Group>
                        {errors?.new_password1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                placeholder="confirm new password"
                                type="password"
                                value={new_password2}
                                onChange={handleChange}
                                name="new_password2"
                            />
                        </Form.Group>
                        {errors?.new_password2?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Button type="submit" className={btnStyles.Button}>
                            Save
                        </Button>
                        <Button
                            className={btnStyles.Button}
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default ProfilePasswordChange