import { Dispatch, SetStateAction } from 'react';
import { Post } from '../Interfaces/ObjectInterfaces';

export interface GetPostDetails {
    (setPost: Dispatch<SetStateAction<Post>>,
        setError: Dispatch<SetStateAction<string | undefined>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
        postDetailsId: string): Promise<void>
}
