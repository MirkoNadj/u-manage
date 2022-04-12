import React, { FC, useEffect, useState } from 'react';
import './PostsList.css';
import { Post } from '../../Interfaces/ObjectInterfaces';
import { PostCard } from '../partials/PostCard/PostCard';
import { Loading } from '../partials/Loading/Loading';
import axios, { AxiosResponse } from 'axios';
import { isAxiosError } from '../../Interfaces/TypeGuards';

export const PostsList: FC = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async <T,>(): Promise<void> => {
        setLoading(true);
        try {
            const response: AxiosResponse = await axios.get<T, AxiosResponse<T>>('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
            setError(null);
        }
        catch (err) {
            if (isAxiosError(err)) {
                setError(err.message);
                setPosts([]);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='list-container'>
            {loading && <Loading />}
            {error && <h1 className='error'>{error}</h1>}
            {posts.map((postsListItem: Post) => {
                return <PostCard title={postsListItem.title} body={postsListItem.body} />;
            })}
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
        </div>
    )
}
