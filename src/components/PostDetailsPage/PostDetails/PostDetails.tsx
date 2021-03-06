import React, { FC } from 'react';
import './PostDetails.scss';
import { useParams } from 'react-router-dom';
import PostTitleBody from '../PostTitleBody/PostTitleBody';
import CommentsList from '../CommentsList/CommentsList';

export const PostDetails: FC = () => {
    let { postDetailsId } = useParams(); console.log('parent,', postDetailsId)
    return (<div className='post-details theme'>
        <PostTitleBody postDetailsId={postDetailsId} />
        <CommentsList postDetailsId={postDetailsId} />
    </div>
    );
};