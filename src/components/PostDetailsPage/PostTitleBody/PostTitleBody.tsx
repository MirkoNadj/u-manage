import React, { FC, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostTitleBody.css';
import { Loading } from '../../partials/Loading/Loading';
import { TextAreaField } from '../../partials/TextAreaField/TextAreaField';
import { getPostDetails, deletePost, editPost, defaultPost } from '../../../services/fetchData';
import { Post, PostTitleBodyInt } from '../../../Interfaces/ObjectInterfaces';

export const PostTitleBody: FC<PostTitleBodyInt> = ({ postDetailsId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const [post, setPost] = useState<Post>(defaultPost);

    const getDetails = useCallback(() => {
        getPostDetails(setPost, setError, setLoading, postDetailsId!)
    }, [postDetailsId]);

    useEffect(() => {
        getDetails()
    }, [getDetails]);

    const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setPost({
            ...post,
            [event.target.id]: event.target.value,
        });
    };

    const navigate = useNavigate();

    const deleteP = (postDetailsId: number) => {
        deletePost(setError, setLoading, postDetailsId);
        navigate('/newsletterPosts');
    };

    const editP = (postBody: Post, postDetailsId: number) => {
        editPost(postBody, setPost, setError, setLoading, postDetailsId);
    };

    return (
        <div className='postDetails'>
            <h1>Post Details</h1>
            <button onClick={() => editP(post, post.id)}>Edit</button>
            <button onClick={() => { deleteP(post.id) }}>Delete</button>
            <div className='details-container'>

                <TextAreaField
                    label={'Title'}
                    id={'title'}
                    name={'title'}
                    value={post.title}
                    defaultValue={post.title}
                    maxLength={50}
                    onChange={handleChangeInput}
                />
                <TextAreaField
                    label={'Body'}
                    id={'body'}
                    name={'body'}
                    value={post.body}
                    defaultValue={post.body}
                    maxLength={100}
                    onChange={handleChangeInput}
                />
                {loading && <Loading />}
                {error && <h1 className='error'>{error}</h1>}

            </div>
        </div>
    )
}