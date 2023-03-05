import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Image from "react-bootstrap/Image";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import createFormStyles from "../../styles/PostCreateForm.module.css";
import { useParams } from "react-router-dom";


/**
 * Form to create posts
 */
const PostEditForm = () => {

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
    const { id } = useParams(); // to get the parameter out of the URL

    /**
     * Using the post id parameter, it handles API request and gets data of post
     * Prevents editing other users' posts
     * If other than user tries to edit they get redirected to main page
     */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                const { title, category, description, image, is_owner } = data;

                is_owner
                    ? setPostData({ title, category, description, image })
                    : history.push("/");
            } catch (err) {
                console.log(err)
            }
        };

        handleMount();
    }, [history, id]);

    /* 


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

    /* 
       * Handles Edit post form submission
       * axios request is put instaed of post
       * Redirects the user to the post page
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container >
            <h3 className={`${createFormStyles.Title} mt-5`}>
                Go ahead and edit your post!
            </h3>

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
                    Update
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

export default PostEditForm;