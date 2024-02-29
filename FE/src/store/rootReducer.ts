import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThreadByIdSlice, ThreadSlice, } from "./slice";
import UserSlice from "./slice/UserSlice";


// export const { STATE_THREAD,  } = ThreadSlice.actions
export const { STATE_THREAD_BY_ID } = ThreadByIdSlice.actions
export const { STATE_THREAD } = ThreadSlice.actions


export const threadByIdReducer = ThreadByIdSlice.reducer
export const threadReducer = ThreadSlice.reducer

export const rootReducer = combineReducers({
    threadById: threadByIdReducer,
    thread:threadReducer,
    user: UserSlice
})

export const store = configureStore({
    reducer: rootReducer
 })
  
