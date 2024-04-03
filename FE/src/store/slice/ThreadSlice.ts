import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  IThreadById, initialStateThread } from "../../types/Type";
import { api } from "../../libs/api";


const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')} `}
}
// console.log(config)
export const dataThreads = createAsyncThunk(
    'thread/fetchByIdStatus',
    async () => {
        try {
            const response = await api.get('/thread',config)
            // console.log("respone",response.data.data);
            return response.data.data
            
        } catch (error) {
            console.log(error);
        }
    }
)

const initialThread: initialStateThread = {
    thread: [],
}

const threadSlice = createSlice({
    name: 'thread',
    initialState: initialThread,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(dataThreads.fulfilled, (state, action) => {
            state.thread = action.payload
            // console.log("action payload",action.payload);
            
        })
    }
})

export default threadSlice.reducer




const initialThreadByIdState: IThreadById = {
    id: 0,
    content: '',
    created_at: '',
    image_thread: '',
    numberOfReply: 0,
    likes:0,
    isLikes:false,
    reply:[{
        id: 0,
        content: '',
        created_at: '',
        user: {
            id: 0,
            fullName: '',
            username: '',
            photo_profile: '',
        }
    }],
    user: {
        id: 0,
        fullName: '',
        username: '',
        photo_profile: ''
    }
}

export const ThreadByIdSlice = createSlice({
    name:'threadById',
    initialState: initialThreadByIdState,
    reducers:{
        STATE_THREAD_BY_ID: (_, action) => {
            const threadById: IThreadById = action.payload
            return threadById
        }
    },
})
