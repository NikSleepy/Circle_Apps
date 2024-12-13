import { useToast } from '@chakra-ui/react';
import { api } from '../../../libs/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store/type';
import { useDispatch } from 'react-redux';
import { dataThreads } from '../../../store/slice';
import { useThreadUser } from '../../DitailUser/hooks/useThreadUser';

export const useDeleteThread = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();
  const { threadUser } = useThreadUser();
  const toast = useToast();
  const token = localStorage.getItem('token');
  const deleteThread = async (id: number) => {
    try {
      const response = await api.delete(`/thread/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      dispatch(dataThreads());
      threadUser();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete thread',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return {
    deleteThread,
  };
};
