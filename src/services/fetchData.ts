import {Dispatch, SetStateAction} from 'react';
import axios from 'axios';
import { isAxiosError } from "../Interfaces/TypeGuards";
import {Post, Comment} from '../Interfaces/ObjectInterfaces';
import { GetPostDetails } from '../Interfaces/FetchInterface';

export const getPostDetails:GetPostDetails= async(
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

export const getComments = async(
        setComments:Dispatch<SetStateAction<Comment[]>>, 
        setError:Dispatch<SetStateAction<string | undefined>>, 
        setLoading:Dispatch<SetStateAction<boolean>>, 
        postDetailsId:string) => {

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

export const editPost = async(
    postBody: Post, setPost: Dispatch<SetStateAction<Post>>, 
    setError:Dispatch<SetStateAction<string | undefined>>, 
    setLoading:Dispatch<SetStateAction<boolean>>, 
    postDetailsId:number) => {

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

export const deletePost = async(
    setError:Dispatch<SetStateAction<string | undefined>> , 
    setLoading:Dispatch<SetStateAction<boolean>>, 
    postDetailsId:number) => {
        
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