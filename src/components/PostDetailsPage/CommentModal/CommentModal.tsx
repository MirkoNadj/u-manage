import React, { FC } from 'react';
import './CommentModal.css';
import { CommentModalInt } from '../../../Interfaces/ObjectInterfaces';

export const CommentModal: FC<CommentModalInt> = ({ commentItem, setIsModal }) => {
    return (
        <div className='comment-modal-container' onClick={() => { setIsModal(false) }}>
            <h1>Name:</h1>
            <h2>{commentItem.name}</h2>
            <h1>E-mail:</h1>
            <h3>{commentItem.email}</h3>
            <h1>Comment:</h1>
            <p>{commentItem.body}</p>
        </div>
    )
}