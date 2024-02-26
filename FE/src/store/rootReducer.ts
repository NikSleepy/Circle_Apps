import { combineReducers } from "@reduxjs/toolkit";
import { ThreadByIdSlice, } from "./slice";
import ThreadSlice from "./slice/ThreadSlice";


// export const { STATE_THREAD,  } = ThreadSlice.actions
export const { STATE_THREAD_BY_ID } = ThreadByIdSlice.actions


export const threadByIdReducer = ThreadByIdSlice.reducer

export const rootReducer = combineReducers({
    threadById: threadByIdReducer,
    thread: ThreadSlice
})

