import React from 'react'
import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'

const PopularProfiles = () => {
    return (
        <Container className={appStyles.Content}>
            <p>Most popular profiles</p>
        </Container>
    )
}

export default PopularProfiles