import { Dispatch, SetStateAction } from 'react';
import { Post, Comment } from '../Interfaces/ObjectInterfaces';

export interface PostDetails {
    setPost: Dispatch<SetStateAction<Post>>,
    setError: Dispatch<SetStateAction<string | undefined>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    postDetailsId: string | undefined
}

export interface PostComment {
    setComments: Dispatch<SetStateAction<Comment[]>>,
    setError: Dispatch<SetStateAction<string | undefined>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    postDetailsId: string | undefined
}

export interface EditPost {
    postBody: Post,
    setPost: Dispatch<SetStateAction<Post>>,
    setError: Dispatch<SetStateAction<string | undefined>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    postDetailsId: number
}

export interface DeletePost {
    setError: Dispatch<SetStateAction<string | undefined>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    postDetailsId: number
}