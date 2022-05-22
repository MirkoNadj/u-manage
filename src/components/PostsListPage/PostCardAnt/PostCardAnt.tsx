import React, { FC } from 'react';
import './PostCardAnt.scss';
import { useNavigate } from 'react-router-dom'
import { Post } from '../../../Interfaces/ObjectInterfaces';
import { Card, Avatar } from 'antd';
import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import TextTruncate from 'react-text-truncate';

const { Meta } = Card;

export const PostCardAnt: FC<Post> = ({ title, body, id }) => {
    let navigate = useNavigate()

    return (
        <Card className='ant-postCard-override .postcard-theme'
            bordered={true}
            hoverable={true}
            cover={
                <img
                    alt="random"
                    src={`https://picsum.photos/id/${id + 110}/100/100`}
                />
            }
            extra={<><div className='stars'> {[...Array((Math.round(Math.random() * 5) + 1))].map((item) => <StarOutlined className='star-outlined' />)}</div>
                <div className='more' onClick={() => navigate((`/newsletterPosts/${id}`))}><EllipsisOutlined /></div></>
            }  >
            <Meta
                avatar={<Avatar src={`https://joeschmoe.io/api/v1/${id}`} />}
                title={<h2>
                    <TextTruncate
                        line={2}
                        element="span"
                        truncateText=""
                        text={title}
                    /></h2>}
                description={<h4>
                    <TextTruncate
                        line={3}
                        element="span"
                        truncateText="..."
                        text={body}
                    /></h4>}
            />
        </Card>
    );
}