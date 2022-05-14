import React, { FC, useState } from 'react';
import './CommentCardStyles/CommentCard.css';
import { CommentCardInt } from '../../../Interfaces/ObjectInterfaces';
import { CommentModal } from '../CommentModal/CommentModal';

export const CommentCard: FC<CommentCardInt> = ({ commentItem }) => {
    const [isModal, setIsModal] = useState(false);
    const [seeMail, setSeeMail] = useState(false);
    const nameText = seeMail ? commentItem.email : commentItem.name.slice(0, 30)
    const bodyText = commentItem.body.length <= 15 ? commentItem.body : commentItem.body.slice(0, 15).concat(' ...')
    return (
        <div className='comment-card'>
            <div className='comment-name' onMouseOver={() => { setSeeMail(true) }} onMouseLeave={() => { setSeeMail(false) }}>
                {nameText}
            </div>
            <div className='comment-area' onClick={() => { setIsModal(true) }}>{bodyText}
            </div>
            {isModal && <CommentModal commentItem={commentItem} setIsModal={setIsModal} />}
        </div>
    )
}