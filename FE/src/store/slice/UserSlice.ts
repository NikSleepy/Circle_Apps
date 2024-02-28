import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api as API} from "../../assets/libs/api"
import { IProfile } from "../../assets/types/Type"


const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`}
}

export const userLogin = createAsyncThunk(
    'user/fecthByIdStatus',
    async () => {
        try {
            const response = await API.get('users/client', config)
            
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

const intitialUser: IProfile = {
    data: {
        id: 0,
        username: "",
        fullName: "",
        password: "",
        email: "",
        description: "",
        photo_cover: "",
        photo_profile: ""
    }

}

const userSlice = createSlice({
    name:'user',
    initialState: intitialUser,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})


export default userSlice.reducer