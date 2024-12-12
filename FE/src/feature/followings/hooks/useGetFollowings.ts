// import { Api } from '../../../libs/api'
import { useDispatch } from 'react-redux';
import { STATE_FOLLOW } from '../../../store/rootReducer';
import { useEffect } from 'react';
import { api } from '../../../libs/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useGetFollowings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const followers = async () => {
    try {
      const response = await api.get('/followings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(STATE_FOLLOW(response.data.data));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    followers();
  }, []);

  return {
    followers,
  };
};
