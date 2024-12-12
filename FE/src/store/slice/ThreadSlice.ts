import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IThreadById, initialStateThread } from '../../types/Type';
import { Api } from '../../libs/api';

// console.log(config)
export const dataThreads = createAsyncThunk('thread/fetchThreads', async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('not have a token');
    } else {
      const response = await Api.get('/thread', {
        headers: {
            Authorization: `Bearer `+ token
        }
      });
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
});

const initialThread: initialStateThread = {
  thread: [],
};


const threadSlice = createSlice({
  name: 'thread',
  initialState: initialThread,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dataThreads.fulfilled, (state, action) => {
      state.thread = action.payload;
      // console.log("action payload",action.payload);
    });
  },
});

export default threadSlice.reducer;

const initialThreadByIdState: IThreadById = {
  id: 0,
  content: '',
  created_at: '',
  image_thread: '',
  numberOfReply: 0,
  likes: 0,
  isLikes: false,
  reply: [
    {
      id: 0,
      content: '',
      created_at: '',
      user: {
        id: 0,
        fullName: '',
        username: '',
        photo_profile: '',
      },
    },
  ],
  user: {
    id: 0,
    fullName: '',
    username: '',
    photo_profile: '',
  },
};

export const ThreadByIdSlice = createSlice({
  name: 'threadById',
  initialState: initialThreadByIdState,
  reducers: {
    STATE_THREAD_BY_ID: (_, action) => {
      const threadById: IThreadById = action.payload;
      return threadById;
    },
  },
});
