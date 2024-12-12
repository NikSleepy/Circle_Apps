import { useToast } from '@chakra-ui/react';
import { api } from '../../../libs/api';

export const usePostFollows = () => {
  const toast = useToast();

  const handleSubmit = async (id: number) => {
    try {
      const response = await api.post(`/user/following/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast({
        title: `${response.data.message}`,
        duration: 2000,
        status: 'success',
        position: 'top',
      });
        //  dispatch(STATE_USERALL(handleSubmit))
    } catch (error) {
      toast({
        title: 'gagal follow nih bang',
        duration: 2000,
        status: 'error',
        position: 'top',
      });
    }
  };

  return {
    handleSubmit,
  };
};
