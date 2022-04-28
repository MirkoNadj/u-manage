import React, { useEffect } from 'react';
import './PostsList.css';
import { Post } from '../../Interfaces/ObjectInterfaces';
import { PostCard } from '../partials/PostCard/PostCard';
import { Loading } from '../partials/Loading/Loading';
import { AppDispatch, RootState } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { fetchPosts } from '../../features/postsSlice';

export const PostsList = (props: PropsFromRedux) => {
    const { fetchPosts, posts } = props;

    useEffect(() => {
        fetchPosts('')
    }, [fetchPosts]);

    return (
        <div className='list-container'>
            {posts.status === 'loading' && <Loading />}
            {posts.status === 'failed' && <h1 className='error'>{posts.error}</h1>}
            {posts.postsList.map((postsListItem: Post, index = postsListItem.id) => {
                return <PostCard title={postsListItem.title} body={postsListItem.body} id={postsListItem.id} />;
            })}
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
        </div>
    );
};

let mapStateToProps = (state: RootState) => {
    return {
        posts: state.posts
    };
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchPosts: (postDetailsId: string) => dispatch(fetchPosts(postDetailsId))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);