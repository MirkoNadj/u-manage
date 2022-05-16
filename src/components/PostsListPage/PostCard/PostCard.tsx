import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'
import './PostCardStyles//PostCard.css';
import { Post } from '../../../Interfaces/ObjectInterfaces';
import { EllipsisOutlined } from '@ant-design/icons';
import TextTruncate from 'react-text-truncate';

export const PostCard: FC<Post> = ({ title, body, id }) => {
    let navigate = useNavigate()
    return (
        <div className='postcard postcard-theme'>
            <div onClick={() => navigate((`/newsletterPosts/${id}`))}><EllipsisOutlined /></div>
            <img src={`https://picsum.photos/id/${id + 110}/100/100`} alt='random-img'></img>
            <h2>
                <TextTruncate
                    line={2}
                    element="span"
                    truncateText=""
                    text={title}
                /></h2>
            <h4>
                <TextTruncate
                    line={3}
                    element="span"
                    truncateText="..."
                    text={body}
                /></h4>
        </div>
    )
}
