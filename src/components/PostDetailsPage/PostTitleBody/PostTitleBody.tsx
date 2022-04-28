import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostTitleBody.css';
import { Loading } from '../../partials/Loading/Loading';
import { TextAreaField } from '../../partials/TextAreaField/TextAreaField';
import { Post } from '../../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { deletePost, editPost } from '../../../features/postsSlice';

export const PostTitleBody = (props: PropsFromRedux) => {
    const { posts, postDetailsId } = props;
    const [post, setPost] = useState<Post>(posts.postsList[postDetailsId - 1]);
    const navigate = useNavigate();

    const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setPost({
            ...post,
            [event.target.id]: event.target.value,
        });
    };

    const deleteP = (postId: number) => {
        props.deletePost(postId);
        setTimeout(() => { navigate('/newsletterPosts') }, 1000);
    };

    return (
        <div className='postDetails'>
            <h1>Post Details</h1>
            <button onClick={() => { props.editPost(post) }}>Edit</button>
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
                {posts.status === 'loading' && <Loading />}
                {posts.status === 'deleted' && <h1>Post deleted</h1>}
                {posts.status === 'patched' && <h1>Post changed</h1>}
                {posts.error && <h1 className='error'>{posts.error}</h1>}
            </div>
        </div>
    )
}

let mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        posts: state.posts,
        postDetailsId: ownProps.postDetailsId
    }
}

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        deletePost: (postId: number) => dispatch(deletePost(postId)),
        editPost: (postBody: Post) => dispatch(editPost(postBody))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapStateToProps, mapDispatchToProps)(PostTitleBody)