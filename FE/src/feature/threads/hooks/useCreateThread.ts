import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { API } from '../../../libs/api';
import { useDispatch } from 'react-redux';
import { dataThreads } from '../../../store/slice';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store/type';

interface ITypes {
  content: string;
  image_thread: File | null;
}

export const useCreateThread = () => {
  const toast = useToast();
  const [img, setImg] = useState<string>('');
  const [data, setData] = useState<ITypes>({
    content: '',
    image_thread: null,
  });
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, content: e.target.value }));
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg( reader.result as string );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, image_thread: e.target.files![0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.image_thread && !['image/jpeg', 'image/png', 'image/gif'].includes(data.image_thread.type)) {
      toast({
        title: 'Only image files (JPEG, PNG, GIF) are allowed',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
      return; // Stop the submission
    }
    try {
      await API.post('/thread/post', data)

      dispatch(dataThreads());
      setData({
        content: '',
        image_thread: null,
      });
      toast({
        title: 'success upload thread',
        status: 'success',
        duration: 2000,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: `eror in post ${error}`,
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    }
  };

  return {
    handleChange,
    handleChangeFile,
    handleSubmit,
    img
  };
};
