import React, { useEffect, useRef, useState } from 'react';
import {Container, Form, Button, Alert, Image} from 'react-bootstrap';

import { useHistory, useParams, } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Upload from '../../assets/upload.png';
import { useCurrentUser, useSetCurrentUser, } from '../../contexts/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import createFormStyles from '../../styles/ProfileCreateForm.module.css';

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        age_group: "",
        brief_bio: "",
        image: "",
    });

    const { name, age_group, brief_bio, image } = profileData;
   

    const [errors, setErrors] = useState({});

    /**
     * If an authenticated user than retrieve existing data
     * If not then redirect to homepage
     */
    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, age_group, brief_bio, image } = data;
                    setProfileData({ name, age_group, brief_bio, image });
                } catch (err) {
                    // console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    /**
     * Updates empty key:value pairs in variable
     */
    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };


    /**
     * Update the be-inspired-drf-api with added profile data
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age_group", age_group);
        formData.append("brief_bio", brief_bio);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            // console.log(err);
            setErrors(err.response?.data);
        }
    };


    return (
        <Container >
            <h3 className={`${createFormStyles.Title} mt-5`}>
                Go ahead and edit your Profile!
            </h3>
            <Form onSubmit={handleSubmit} className={createFormStyles.Container}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleChange}
                        aria-label="name"
                    />
                </Form.Group>
                {errors?.name?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>Age Group</Form.Label>
                    <Form.Control
                        as="select"
                        type="text"
                        name="age_group"
                        value={age_group}
                        onChange={handleChange}
                        aria-label="age group"
                    >
                        <option value="Select agegroup">Select Age Group </option>
                        <option value="Teenager (10 - 18)">Teenager </option>
                        <option value="Young Adult (19 - 25)">Young Adult</option>
                        <option value="Adult (26 - 40)">Adult</option>
                        <option value="Middle Aged (41 - 60)">Middle Aged</option>
                        <option value="Senior (>61)">Senior</option>
                    </Form.Control>
                </Form.Group>
                {errors?.age_group?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>Brief Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={brief_bio}
                        onChange={handleChange}
                        name="brief_bio"
                        aria-label="brief bio"
                        placeholder="Describe in a few words about who you are"
                        rows={5}
                    />
                </Form.Group>
                {errors?.brief_bio?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}


                <Form.Group className="text-center">
                    {image ? (
                        <>
                            <figure>
                                <Image className={appStyles.Image}
                                    src={image} rounded />
                            </figure>

                        </>
                    ) : (
                        <Form.Label htmlFor="image-upload">
                            <Asset
                                className={createFormStyles.Asset}
                                src={Upload}
                                message="Click here to upload an image"
                            />
                        </Form.Label>
                    )}

                    <Form.File
                        id="image-upload"
                        ref={imageFile}
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files.length) {
                                setProfileData({
                                    ...profileData,
                                    image: URL.createObjectURL(e.target.files[0]),
                                });
                            }
                        }}
                    />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Button 
                className={`${btnStyles.Button} m-1`}
                    type="submit">
                    Update
                </Button>
                <Button
                    onClick={() => history.goBack()}
                    className={`${btnStyles.Button} m-1`}
                >
                    Cancel
                </Button>

            </Form>
            <br />
        </Container>
    );
};
export default ProfileEditForm;