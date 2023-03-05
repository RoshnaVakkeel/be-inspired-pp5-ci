import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';


const SignUpForm = () => {
  /**
 * To render SignUp form
 * Followed Moments walkthrough was used as a guidance
 * To create variables, data handling and error handling code
 */
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const history = useHistory(); // to link to next page

  const [errors, setErrors] = useState({}); // to store all the errors

  /**
   * onChange event handler
   */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,  // Converts the entered data into Key:Value pairs
    });
  };

  /**
 * Provides data to API
 * Redirects the user to signin page
 * Displays Error messages upon invalid data inputs
 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data)
    }
  };

  return (
    <Container className={styles.Container}>
      <h2>Sign Up</h2>
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
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}


        <Form.Group controlId="password1">
          <Form.Label className='d-none'>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password1"
            value={password1}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password1?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="password2">
          <Form.Label className='d-none'>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password2?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button
          className={`${btnStyles.Button} ${btnStyles.Wide}`}
          type="submit">
          Sign Up
        </Button>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert variant="warning" className="mt-4" key={idx}>
            {message}
          </Alert>
        ))}

      </Form>

      <div>
        <p>
          Already have an account?
          <Link to="/signin" className={styles.Link}>
            <strong> Sign in!</strong>
          </Link>
        </p>
      </div>
    </Container>
  )
}

export default SignUpForm