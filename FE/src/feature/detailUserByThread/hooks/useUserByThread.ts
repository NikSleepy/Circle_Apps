import { useState } from 'react';
import { Api, api } from '../../../libs/api';
// import { useThreadUser } from '../../DitailUser/hooks/useThreadUser';
// import { Action, ThunkDispatch } from '@reduxjs/toolkit';
// import { RootState } from '../../../store/type';
// import { useDispatch } from 'react-redux';
// import { dataThreads } from '../../../store/slice';

interface Iuser {
  id: number;
  fullName: string;
  username: string;
  photo_profile: string;
  photo_cover: string;
  followers: number;
  followings: number;
  description: string;
  isFollow: boolean;
}

// interface ILike {
//     id: number
// }

// interface IReply {
//     id: number
//     content: string
//     created_at: string
//     user: Iuser
// }

interface IThread {
  id: number;
  content: string;
  image_thread: string;
  created_at: string;
  isLike: boolean;
  Likes: number;
  numberOfReply: number;
  user: {
    id: number;
    username: string;
    fullName: string;
    photo_profile: string;
  };
}

interface IFollow {
    id: number
    fullName: string
    username: string
    photo_profile: string
    isFollow: boolean

}



export const useUserByThread = () => {
  const [user, setUser] = useState<Iuser | null>(null); // Menyimpan data user
  const [threads, setThreads] = useState<IThread[]>([]); // Menyimpan daftar threads
  const [followings, setFollowings] = useState<IFollow[]>([]); // Menyimpan daftar followings
  const [followers, setFollowers] = useState<IFollow[]>([]);
  // const { threadUser } = useThreadUser();
  // const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const token = localStorage.getItem('token');

  const userByThread = async (id: number) => {
    try {
      const response = await api.post(
        `/user/thread/`,
        { user_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { user, threads, followers, followings } = response.data.data;

      setUser(user);
      setThreads(threads);
      setFollowings(followings);
      setFollowers(followers);

    //   console.log("user by threads", threads)
    } catch (error) {
      console.log('error get user by thread');
    }
  };


  const handleLikes = async (id: number) => {
    try {
      const data = {
        thread: id,
      };
      await Api.post('/thread/like', data);
      // dispatch(dataThreads());
      // threadUser();
    } catch (error) {
      console.log('error in post like', error);
    }
  };

  return {
    userByThread,
    handleLikes,
    user,
    threads,
    followers,
    followings,
  };
};
