import axios from 'axios';
import { isAxiosError } from "../Interfaces/TypeGuards";
import {Post, Comment} from '../Interfaces/ObjectInterfaces';
import { PostDetails, EditPost, DeletePost } from '../Interfaces/FetchInterface';

export const getPostDetails:PostDetails<Post>= async(
    setPost, 
    setError, 
    setLoading, 
    postDetailsId) => {
    setLoading(true)
    try{
        const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postDetailsId}`);
        setPost( response.data);
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

export const getComments: PostDetails<Comment[]> = async(
        setComments, 
        setError, 
        setLoading, 
        postDetailsId) => {

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

export const editPost: EditPost<Post> = async(
    postBody,
    setPost, 
    setError, 
    setLoading, 
    postDetailsId) => {

    setLoading(true)
    try{
        const response = await axios.patch<Post>(`https://jsonplaceholder.typicode.com/posts/${postDetailsId}`, 
        {body: postBody.body,
        id: postBody.id,
        title: postBody.title,
        userId: postBody.userId});
        setPost( response.data)   
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

export const deletePost: DeletePost = async(
    setError, 
    setLoading, 
    postDetailsId) => {
        
    setLoading(true)
    try{
        await axios.delete<Post>(`https://jsonplaceholder.typicode.com/posts/${postDetailsId}`);
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