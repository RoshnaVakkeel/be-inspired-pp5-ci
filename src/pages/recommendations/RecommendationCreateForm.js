import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

import { Alert, Image, Container, Form, Button } from "react-bootstrap";

import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import createFormStyles from "../../styles/PostCreateForm.module.css";

/**
 * Form to create recommendations
 */

const RecommendationCreateForm = () => {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});

    const [recommendationData, setrecommendationData] = useState({
        title: "",
        category: "",
        price_category: "",
        description: "",
        reason: "",
        image: "",
    });

    const { title, category, price_category, description, reason, image } = recommendationData;

    const imageInput = useRef(null);
    const history = useHistory();

    /**
     * Populate the recommendation data
     */
    const handleChange = (event) => {
        setrecommendationData({
            ...recommendationData,
            [event.target.name]: event.target.value,
        });
    };

    /**
     * Change uploaded image and remove uploaded image by revoke
     */
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setrecommendationData({
                ...recommendationData,
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
        formData.append("price_category", price_category);
        formData.append("description", description);
        formData.append("reason", reason);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/recommendations/", formData);
            history.push(`/recommendations/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container >
            <h3 className={`${createFormStyles.Title} mt-5`}>
                Add a recommendation about your inspiration here!
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
                    <Form.Label>Which category defines it the best?</Form.Label>
                    <Form.Control
                        as="select"
                        aria-label="price_category"
                        value={price_category}
                        name="price_category"
                        onChange={handleChange}
                    >
                        <option value="Select a price_category">Select a price_category</option>
                        <option value="Free">Free</option>
                        <option value="Cheap (€)">Cheap</option>
                        <option value="Average (€€)">Average</option>
                        <option value="Above Average (€€€)">AboveAverage</option>
                        <option value="Expensive (€€€€)">Expensive</option>
                    </Form.Control>
                </Form.Group>
                {errors.price_category?.map((message, idx) => (
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
                
                <Form.Group>
                    <Form.Label>Tell more on why do you recommend it..</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="reason"
                        aria-label="reason"
                        placeholder="Describe in a few words why do you recommend it to others.."
                        value={reason}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.reason?.map((message, idx) => (
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
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} btn`}
                                    htmlFor="image-upload"
                                >
                                    Update image
                                </Form.Label>
                            </div>
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

                <Button className={`${btnStyles.Button} ml-3`}
                    type="submit">
                    Submit
                </Button>
                <Button
                    onClick={() => history.goBack()}
                    className={`${btnStyles.Button}`}
                    type="submit"
                >
                    Cancel
                </Button>

            </Form>
            <br />
        </Container>
    );
};

export default RecommendationCreateForm