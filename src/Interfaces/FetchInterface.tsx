import { Dispatch, SetStateAction } from 'react';

export interface PostDetails<T> {
    (setPost: Dispatch<SetStateAction<T>>,
        setError: Dispatch<SetStateAction<string | undefined>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
        postDetailsId: string): Promise<void>
}

export interface EditPost<T> {
    (postBody: T,
        setPost: Dispatch<SetStateAction<T>>,
        setError: Dispatch<SetStateAction<string | undefined>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
        postDetailsId: number): Promise<void>
}

export interface DeletePost {
    (setError: Dispatch<SetStateAction<string | undefined>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
        postDetailsId: number): Promise<void>
}