import React, { useEffect } from 'react';
import './PostsList.scss';
import { Post } from '../../../Interfaces/ObjectInterfaces';
import { PostCardAnt } from '../PostCardAnt/PostCardAnt';
import { Loading } from '../../partials/Loading/Loading';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { fetchPosts } from '../../../features/postsSlice';

export const PostsList = (props: PropsFromRedux) => {
    const { fetchPosts, posts } = props;

    useEffect(() => {
        if (posts.status === 'idle') {
            fetchPosts('')
        }
    }, [fetchPosts, posts.status]);

    return (
        <div className='post-list-page theme'>
            <div className='newsletters'>
                <h1>Read the latest Newsletters here...</h1><br></br>
                <h3>Click on more to see the details...</h3><br></br>
            </div>
            <div className='list-container'>
                {posts.status === 'loading' && <Loading />}
                {posts.status === 'failed' && <h1 className='error'>{posts.error}</h1>}
                {posts.postsList.map((postsListItem: Post) => {
                    return <PostCardAnt title={postsListItem.title} body={postsListItem.body} id={postsListItem.id} key={postsListItem.id} />;
                })}
            </div>
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
        fetchPosts: (postDetailsId: string) => dispatch(fetchPosts(postDetailsId)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);