import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PostTitleBody } from '../PostTitleBody/PostTitleBody';
import { Comments } from '../Comments/Comments';

export const PostDetails: FC = () => {
    let { postDetailsId } = useParams();
    return (<div>
        <PostTitleBody postDetailsId={postDetailsId} />
        <Comments postDetailsId={postDetailsId} />
    </div>
    )
}