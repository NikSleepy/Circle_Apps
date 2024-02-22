import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./slice/AuthSlice";

export const { AUTH_LOGIN, } = AuthSlice.actions;

export const authReducer = AuthSlice.reducer

const roootReducer = combineReducers({
    auth: authReducer
})

export default roootReducer;