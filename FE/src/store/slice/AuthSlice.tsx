import { createSlice } from "@reduxjs/toolkit";

interface Ilogin {
    username: string,
    password: string
}

const initialUserLogin : { data: Ilogin } = {
    data: {
        username: '',
        password: ''

    },
};

export const AuthSlice = createSlice({
    name: 'login',
    initialState: initialUserLogin,
    reducers: {
        AUTH_LOGIN: ( state, action ) => {
            return {
                ...state, ...action.payload
            }
        }
    }
})