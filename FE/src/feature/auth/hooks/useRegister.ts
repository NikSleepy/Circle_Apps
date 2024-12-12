import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../libs/api';
import { useToast } from '@chakra-ui/react';

export const useRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (/[^a-zA-Z0-9 ]/.test(data.username)) {
      toast({
        title: 'Username can only contain letters, numbers, and spaces',
        status: 'error',
        duration: 2000,
        position: 'top',
      });
      return;
    }
    if (/[^a-zA-Z0-9 ]/.test(data.fullName)) {
      toast({
        title: 'FullName can only contain letters, numbers, and spaces',
        status: 'error',
        duration: 2000,
        position: 'top',
      });
      return;
    }

    try {
      const response = await api.post('/register', data);
      if (response.data.status == 400) {
        toast({
          title: `${response.data.message}`,
          status: 'error',
          duration: 2000,
          position: 'top',
        });
      } else {
        toast({
          title: `${response.data.message}`,
          status: 'success',
          duration: 2000,
          position: 'top',
        });
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: `Min Password 8 Charakter`,
        status: 'error',
        duration: 2000,
        position: 'top',
      });
    }
  };

  return {
    handleChange,
    handleSubmit,
  };
};
