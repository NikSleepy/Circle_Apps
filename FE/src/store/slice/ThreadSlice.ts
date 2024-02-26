import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IThreadById, initialStateThread } from "../../assets/types/Type";
import { api } from "../../assets/libs/api";


// const initialThreadState: IThread[] = []

// export const ThreadSlice = createSlice({
//     name: 'thread',
//     initialState: initialThreadState,
//     reducers: {
//         STATE_THREAD: (_, action ) => {
            
            
//             const thread: IThread[] = action.payload.map((item: IThread) => {
               
//                 return {
//                     id: item.id,
//                     content: item.content,
//                     image_thread: item.image_thread,
//                     created_at: item.created_at,
//                     numberOfReply: item.numberOfReply,
//                     likes: item.likes,
//                     user: {
//                         id: item.user.id,
//                         username: item.user.username,
//                         fullName: item.user.fullName,
//                         photo_profile: item.user.photo_profile

//                     },

//                 }

//             })
//             // console.log("dari redux",thread);
            
//             return thread
//         }
//     }
// })

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')} `}
}
// console.log(config)
export const getThread = createAsyncThunk(
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
        builder.addCase(getThread.fulfilled, (state, action) => {
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
