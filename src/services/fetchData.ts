import axios from 'axios';
import { isAxiosError } from "../Interfaces/TypeGuards";
import {Post, Comment} from '../Interfaces/ObjectInterfaces';
import { PostComment} from '../Interfaces/FetchInterface';

export const getComments = async(
        {setComments, 
        setError, 
        setLoading, 
        postDetailsId}:PostComment) => {

    setLoading(true)
    try{
        const response = await axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postDetailsId}/comments`);
        setComments( response.data);
    }
    catch (err) {
        if (isAxiosError(err)) {
            setError(err.message)
        }
    }
    finally {
        setLoading(false);
    }
}

export const comment: Comment = {
    postId: 1,
    id: 1,
    name: '',
    email: '',
    body: '',
}

export const defaultPost: Post = {
    body: '',
    id: 0,
    title: ''
}  