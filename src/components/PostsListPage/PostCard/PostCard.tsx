import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'
import './PostCardStyles//PostCard.css';
import { Post } from '../../../Interfaces/ObjectInterfaces';
import { EllipsisOutlined } from '@ant-design/icons';;


export const PostCard: FC<Post> = ({ title, body, id }) => {
    let navigate = useNavigate()
    return (
        <div className='postCard' onClick={() => navigate((`/newsletterPosts/${id}`))}>
            <div><EllipsisOutlined /></div>
            <img src={`https://picsum.photos/id/${id + 110}/100/100`} alt='random-img'></img>
            <h1>{title}</h1>
            <h3>{body}</h3>
        </div>
    )
}
