import React, { useEffect } from 'react';
import './CommentsListStyles/CommentsList.css';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment, OwnPropsId } from '../../../Interfaces/ObjectInterfaces';
import { Loading } from '../../partials/Loading/Loading';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { fetchComments } from '../../../features/commentsSlice';

export const CommentsList = (props: PropsFromRedux) => {
    const { fetchComments, comments, postDetailsId } = props;

    useEffect(() => {
        fetchComments(postDetailsId!);
    }, [postDetailsId, fetchComments]);

    return (<div className='comments postcard-theme'>
        <h1>Comments:</h1>
        {comments.status === 'loading' && <Loading />}
        {comments.status === 'failed' && <h1 className='error'>{comments.error}</h1>}

        {comments.commentsList.map((commentItem: Comment) => {
            return (
                <CommentCard commentItem={commentItem} key={commentItem.id} />
            )
        })}
    </div>
    );
};

let mapStateToProps = (state: RootState, ownProps: OwnPropsId) => {
    return {
        comments: state.comments,
        postDetailsId: ownProps.postDetailsId
    };
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchComments: (postDetailsId: string) => dispatch(fetchComments(postDetailsId))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);