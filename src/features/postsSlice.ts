import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Post} from '../Interfaces/ObjectInterfaces';
import { PostsState } from '../Interfaces/SliceInterfaces';

const initialState: PostsState = {
    postsList: [],
    status: 'idle', 
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (postDetailsId:string) => {
    const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts/${postDetailsId}`);
    return response.data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId:number) => {
    await axios.delete<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
})

export const editPost = createAsyncThunk('posts/editPost', async (post: Post) => {
    const response = await axios.patch<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`,
    {   body: post.body,
        id: post.id,
        title: post.title,
        userId: post.userId
    });
    return response.status;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{  

    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })        
        .addCase(fetchPosts.fulfilled, (state, action) => {            
            state.status = 'succeeded'
            if(action.payload && typeof action.payload !== 'string'){
            state.postsList = action.payload            
            }
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';           
            state.error = action.error.message;
        })
        .addCase(editPost.fulfilled, (state,action) => {
            state.status = 'patched';
        })
    }
})

//export const {} = postsSlice.actions

export default postsSlice.reducer