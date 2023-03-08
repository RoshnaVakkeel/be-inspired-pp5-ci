import React from 'react';

import Asset from './Asset';
import NoResults from '../assets/no-results.png';
import Container from "react-bootstrap/Container"

import styles from "../App.module.css";

const NotFound = () => {
      return (
        <Container className={`${styles.Content} mt-5`}>
          <div className='font-weight-bold h5 mt-4'>
          <Asset 
                src={NoResults} 
                message="Oops!! The page you are looking for does not exist.. " 
            />
          </div>
        </Container>
      );
    };

export default NotFound;