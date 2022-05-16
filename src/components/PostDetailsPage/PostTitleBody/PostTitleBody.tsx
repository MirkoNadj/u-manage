import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostTitleBodyStyles/PostTitleBody.css';
import { Loading } from '../../partials/Loading/Loading';
import { TextAreaField } from '../../partials/TextAreaField/TextAreaField';
import { Post, OwnPropsId } from '../../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { deletePost, editPost } from '../../../features/postsSlice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const PostTitleBody = (props: PropsFromRedux) => {
    const { posts, postDetailsId } = props;
    const [post, setPost] = useState<Post>(posts.postsList[parseInt(postDetailsId!) - 1]);
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
        <div className='title-body-container postcard-theme'>
            <h1>Post Details</h1>


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
            <button className='edit-post-btn' title='Edit Post' onClick={() => { props.editPost(post) }}><EditOutlined /></button>
            <button className='del-post-btn' title='Delete Post' onClick={() => { deleteP(post.id) }}><DeleteOutlined /></button>
            {posts.status === 'loading' && <Loading />}
            {posts.status === 'deleted' && <span className='post-status'>Post deleted</span>}
            {posts.status === 'patched' && <span className='post-status'>Post changed</span>}
            {posts.error && <h1 className='error'>{posts.error}</h1>}
        </div>
    );
};

let mapStateToProps = (state: RootState, ownProps: OwnPropsId) => {
    return {
        posts: state.posts,
        postDetailsId: ownProps.postDetailsId
    };
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        deletePost: (postId: number) => dispatch(deletePost(postId)),
        editPost: (postBody: Post) => dispatch(editPost(postBody))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(PostTitleBody);