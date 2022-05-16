import React, { FC } from 'react';
import './PostDetailsStyles/PostDetails.css';
import { useParams } from 'react-router-dom';
import PostTitleBody from '../PostTitleBody/PostTitleBody';
import CommentsList from '../CommentsList/CommentsList';

export const PostDetails: FC = () => {
    let { postDetailsId } = useParams();
    return (<div className='post-details theme'>
        <PostTitleBody postDetailsId={postDetailsId} />
        <CommentsList postDetailsId={postDetailsId} />
    </div>
    );
};