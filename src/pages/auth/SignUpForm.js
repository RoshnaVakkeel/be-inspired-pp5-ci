import React from 'react';
import { Link, useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
  return (
    <Container className={styles.Container}>
      <h2>Sign Up</h2>
      <Form.Group controlId="username">
        <Form.Label className='d-none'>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="password1">
        <Form.Label className='d-none'>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password1"
        />
      </Form.Group>

      <Form.Group controlId="password2">
        <Form.Label className='d-none'>Confirm password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-enter password"
          name="password2"

        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide}`}
        type="submit"
      >
        Sign Up
      </Button>

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