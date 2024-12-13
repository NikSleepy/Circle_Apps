import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  useToast,
} from '@chakra-ui/react';

import { SlPicture } from 'react-icons/sl';
// import { useCreateThread } from '../hooks/useCreateThread';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { dataThreads } from '../../../store/slice';
import { API } from '../../../libs/api';
import { useThreadUser } from '../../DitailUser/hooks/useThreadUser';
interface ITypes {
  content: string;
  image_thread: File | null;
}

export const CreatePost = ({ onClose }: { onClose: () => void }) => {
  const { threadUser } = useThreadUser();
  const user = useSelector((state: RootState) => state.user.data);

  const toast = useToast();
  const [img, setImg] = useState<string>('');
  const [data, setData] = useState<ITypes>({
    content: '',
    image_thread: null,
  });
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, image_thread: e.target.files![0] }));
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/thread/post', data).catch(() => handleSubmit(e));

      dispatch(dataThreads());
      threadUser();
      toast({
        title: 'success upload thread',
        status: 'success',
        duration: 2000,
        position: 'top',
      });

      onClose();
    } catch (error) {
      toast({
        title: `eror in post ${error}`,
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex p={'3vh'} gap={'2vh'} w={'100%'}>
        <Avatar src={`${user.photo_profile}`} />

        <Box w={'100%'} gap={'2vh'} display={'flex'} flexDirection={'column'}>
          {img && <Image src={img} alt="img" w={'50%'} />}
          <Flex gap={'2vh'} >
            <Input
              name="content"
              type="text"
              placeholder="What is Happening!? "
              border={'none'}
              onChange={handleChange}
            ></Input>

            <FormLabel htmlFor="image" >
              <SlPicture size={38} color="#005e0e" />
            </FormLabel>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={handleChangeFile}
              accept="image/jpg, image/jpeg, image/png"
              hidden
            />
            <Button bg={'#005e0e'} type="submit">
              Post
            </Button>
          </Flex>
        </Box>
      </Flex>
    </form>
  );
};
