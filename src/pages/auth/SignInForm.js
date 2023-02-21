import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import styles from "../../styles/SignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from 'axios';


/**
* To render SignIn form
* Followed Moments walkthrough was used as a guidance
* To create variables, data handling and error handling code
*/
function SignInForm() {

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;
    const history = useHistory();

    const [errors, setErrors] = useState({});

    /**
     * onChange event handler
     */
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,  // Converts the entered data into Key:Value pairs
        });
    };

    /**
   * Provides data to API
   * Redirects the user to Home page
   * Displays Error messages upon invalid data inputs
   */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/login/", signInData);
            history.push("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className='d-none'>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                {errors.username?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}


                <Form.Group controlId="password">
                    <Form.Label className='d-none'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Button
                    className={`${btnStyles.Button} ${btnStyles.Wide}`}
                    type="submit">
                    Sign In
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                    <Alert variant="warning" className="mt-4" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Form>
            <div>
                <p>
                    If you haven't registered? Then please
                    <Link to="/signup" className={styles.Link}>
                        <strong> Sign Up!</strong>
                    </Link>
                </p>
            </div>
        </Container>
    )
}

export default SignInForm