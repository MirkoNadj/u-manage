import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import PostTitleBody from '../PostTitleBody/PostTitleBody';
import CommentsList from '../CommentsList/CommentsList';

export const PostDetails: FC = () => {
    let { postDetailsId } = useParams();
    return (<div>
        <PostTitleBody postDetailsId={postDetailsId} />
        <CommentsList postDetailsId={postDetailsId} />
    </div>
    );
};