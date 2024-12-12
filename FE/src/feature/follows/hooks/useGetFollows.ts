// import { useEffect } from "react"
import { Api } from '../../../libs/api';
import { useDispatch } from 'react-redux';
import { STATE_USERALL } from '../../../store/rootReducer';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useGetFollows = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const follow = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(STATE_USERALL(response.data.data));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        navigate('/login');
      }
    }
  };
  // console.log(follows)

  return {
    follow,
  };
};
