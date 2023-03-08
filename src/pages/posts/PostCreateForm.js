import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Image from "react-bootstrap/Image";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import createFormStyles from "../../styles/PostCreateForm.module.css";
import { useRedirect } from "../../hooks/useRedirect";


/**
 * Form to create posts
 */
const PostCreateForm = () => {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        category: "",
        description: "",
        image: "",
    });

    const { title, category, description, image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();

    /**
     * Populate the postData strings
     */
    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    /**
     * Change uploaded image and remove uploaded image by revoke
     */
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    /**
     * submits data to be-inspired-drf-api
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            //   console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container >
            <h3 className={`${createFormStyles.Title} mt-5`}>
                Add a post about your inspiration here!
            </h3>
            <strong>

            </strong>
            <Form onSubmit={handleSubmit} className={createFormStyles.Container}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter a title"
                        aria-label="title"
                        value={title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>Which category defines it the best?</Form.Label>
                    <Form.Control
                        as="select"
                        aria-label="category"
                        value={category}
                        name="category"
                        onChange={handleChange}
                    >
                        <option value="Select a category">Select a category</option>
                        <option value="Books">Books</option>
                        <option value="Music">Music</option>
                        <option value="Person">Person</option>
                        <option value="Place">Place</option>
                        <option value="Art">Art</option>
                        <option value="Event">Event</option>
                        <option value="Movies">Movies</option>
                    </Form.Control>
                </Form.Group>
                {errors.category?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>Decribe your inspiration</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        aria-label="description"
                        placeholder="Describe in a few words about the inspiration you get and how it impacted your life.."
                        value={description}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.description?.map((message, idx) => (
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
                        accept="image/*"
                        onChange={handleChangeImage}
                        ref={imageInput}
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
                    Submit
                </Button>
                <Button
                    onClick={() => history.goBack()}
                    className={`${btnStyles.Button} m-1`}
                    type="submit"
                >
                    Cancel
                </Button>

            </Form>
            <br />
        </Container>
    );
};

export default PostCreateForm;