import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../assets/types/Type";


const initialThreadState: IThread = {
    
    id:0,
    content:"",
    image_thread:"",
    created_at:"",
    numberOfReply:0,
    user:{
        id:0,
        username:"",
        fullName:"",
        photo_profile:""
    }


}

export const ThreadSlice = createSlice({
    name: 'thread',
    initialState: initialThreadState,
    reducers: {
        STATE_THREAD: ( state, action ) => {
            console.log(state, action);
            
        }
    }
})