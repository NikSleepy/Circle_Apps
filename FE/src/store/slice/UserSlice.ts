import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../libs/api';
import { IProfile } from '../../types/Type';

export const userLogin = createAsyncThunk('user/fecthByIdStatus', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await Api.get('users/client', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('dari slice', response.data);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
});

const intitialUser: IProfile = {
  data: {
    id: 0,
    username: '',
    fullName: '',
    email: '',
    description: '',
    photo_cover: '',
    photo_profile: '',
    followers: 0,
    followings: 0,
  },
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: intitialUser,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
