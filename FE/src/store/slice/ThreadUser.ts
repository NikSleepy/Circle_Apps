import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/Type";


const initialThreadUser: IThread[] = []

export const ThreadUserSilce = createSlice({
    name:'threadUser',
    initialState:initialThreadUser,
    reducers: {
        STATE_THREAD_USER: (_, action) => {
            const data:IThread[] = action.payload.map((items:IThread)=> {
                return {
                    id:items.id,
                    content:items.content,
                    image_thread:items.image_thread,
                    created_at:items.created_at,
                    numberOfReply:items.numberOfReply,
                    likes:items.likes,
                    isLikes:items.isLikes,
                    user:items.user
                }
            })
            return data
        }
    }
})