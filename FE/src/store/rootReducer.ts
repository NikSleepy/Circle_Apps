import { combineReducers } from "@reduxjs/toolkit";
import { ThreadSlice } from "./slice";


export const { STATE_THREAD } = ThreadSlice.actions

export const threadReducer = ThreadSlice.reducer

export const rootReducer = combineReducers({
    thread: threadReducer
})