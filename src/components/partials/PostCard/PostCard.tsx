import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'
import './PostCard.css';
import { Post } from '../../../Interfaces/ObjectInterfaces'

export const PostCard: FC<Post> = ({ title, body }) => {
    let navigate = useNavigate()
    return (
        <div className='postCard' onClick={() => navigate('/')}>
            <h1>{title}</h1>
            <h3>{body}</h3>
        </div>
    )
}
