import React, { FC, useState } from 'react';
import './CommentCard.scss';
import { CommentCardInt } from '../../../Interfaces/ObjectInterfaces';
import { Card, Modal } from 'antd';
import { MailOutlined } from '@ant-design/icons';

export const CommentCard: FC<CommentCardInt> = ({ commentItem }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [seeMail, setSeeMail] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const nameText = seeMail ? commentItem.email.slice(0, 30) : commentItem.name.slice(0, 30);
    const bodyText = commentItem.body.length <= 15 ? commentItem.body : commentItem.body.slice(0, 15).concat(' ...');

    return (
        <div >
            <Card className='ant-comment-card-override comment-theme' onClick={() => { setIsModalVisible(true) }}
                hoverable={true}
                title={nameText}
                extra={
                    <div className='seeMail'
                        onMouseOver={() => { setSeeMail(true) }}
                        onMouseLeave={() => { setSeeMail(false) }}
                        onClick={(event) => { event.stopPropagation(); window.location.href = `mailto:${commentItem.email}` }}>
                        <MailOutlined />
                    </div >}
            >
                <div >{bodyText}</div>
            </Card >
            <Modal className='ant-modal-override theme'
                title="Comment details"
                visible={isModalVisible}
                footer={null} onCancel={handleCancel}>
                <h1>Name:</h1>
                <h2>{commentItem.name}</h2>
                <h1>E-mail:</h1>
                <h3>{commentItem.email}</h3>
                <h1>Comment:</h1>
                <p>{commentItem.body}</p>
            </Modal>
        </div>
    );
};