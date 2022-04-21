import React, { FC, useState, useEffect } from 'react';
import './Comments.css'
import { CommentCard } from '../CommentCard/CommentCard';
import { getComments } from '../../../services/fetchData';
import { Comment, CommentInt } from '../../../Interfaces/ObjectInterfaces';
import { Loading } from '../../partials/Loading/Loading';

export const Comments: FC<CommentInt> = ({ postDetailsId }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>();
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        getComments({ setComments, setError, setLoading, postDetailsId })
    }, [postDetailsId])

    return (
        <div className='comments-container'>
            {loading && <Loading />}
            {error && <h1 className='error'>{error}</h1>}
            <h1>Comments:</h1>
            {comments.map((commentItem: Comment) => {
                return (
                    <CommentCard commentItem={commentItem} />
                )
            })}
        </div>
    )
}