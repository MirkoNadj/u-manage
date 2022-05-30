import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostTitleBody.scss';
import { Loading } from '../../partials/Loading/Loading';
import { Post, OwnPropsId } from '../../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { fetchPosts, deletePost, editPost } from '../../../features/postsSlice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export const PostTitleBody = (props: PropsFromRedux) => {
    const { fetchPosts, posts, postDetailsId } = props;

    const navigate = useNavigate();
    const { TextArea } = Input;
    const [post, setPost] = useState<Post>(posts.postsList[parseInt(postDetailsId!) - 1]);

    useEffect(() => {
        fetchPosts('');
    }, [fetchPosts])

    const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setPost({
            ...post,
            [event.target.id]: event.target.value,
        });
    };

    const deleteP = (postId: number) => {
        props.deletePost(postId);
        setTimeout(() => { navigate('/newsletterPosts') }, 1200);
    };

    return (
        <div className='title-body-container title-body-container-theme'>
            {posts.status === 'loading' && (<Loading />)}
            {posts.status === 'failed' && <h1 className='error'>{posts.error}</h1>}

            <h2>Post Details</h2>
            <label>Title</label>
            <TextArea
                autoSize={true}
                bordered={true}
                id={'title'}
                name={'title'}
                value={post.title.substring(0, 50)}
                maxLength={50}
                onChange={handleChangeInput}
            />
            <label>Details</label>
            <TextArea
                autoSize={true}
                bordered={true}
                id={'body'}
                name={'body'}
                value={post.body.substring(0, 100)}
                maxLength={100}
                onChange={handleChangeInput}
            />
            <Button className='edit-post-btn' title='Edit Post' onClick={() => { props.editPost(post); setTimeout(() => { navigate('/newsletterPosts') }, 1200); }}><EditOutlined /></Button>
            <Button className='del-post-btn' title='Delete Post' onClick={() => { deleteP(post.id) }}><DeleteOutlined /></Button>

            {posts.status === 'deleted' && <span className='post-status'>Post deleted</span>}
            {posts.status === 'patched' && <span className='post-status'>Post changed</span>}

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
        fetchPosts: (PostDetailsId: string) => dispatch(fetchPosts(PostDetailsId)),
        deletePost: (postId: number) => dispatch(deletePost(postId)),
        editPost: (postBody: Post) => dispatch(editPost(postBody))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(PostTitleBody);