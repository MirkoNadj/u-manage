import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Comment} from '../Interfaces/ObjectInterfaces';
import { CommentsState } from '../Interfaces/SliceInterfaces';

const initialState: CommentsState = {
    commentsList: [],
    status: 'idle', 
    error: null
}

export const fetchComments = createAsyncThunk('posts/fetchComments', async (postDetailsId:string) => {
    const response = await axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postDetailsId}/comments`);
    return response.data;
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{        
    },
    extraReducers(builder) {
        builder
        .addCase(fetchComments.pending, (state, action) => {
            state.status = 'loading'
        })        
        .addCase(fetchComments.fulfilled, (state, action) => {            
            state.status = 'succeeded'
            if(action.payload && typeof action.payload !== 'string'){
            state.commentsList = action.payload
            }
        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.status = 'failed';           
            state.error = action.error.message;
        })
    }
})

//export const {} = commentsSlice.actions

export default commentsSlice.reducer