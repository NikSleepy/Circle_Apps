import { Avatar, Button, Flex, Input, useToast } from '@chakra-ui/react';
// import { SlPicture } from 'react-icons/sl';
// import { useReply } from '../hooks/useReply';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Api } from '../../../libs/api';
import { STATE_THREAD_BY_ID } from '../../../store/rootReducer';

export const PostReplys = () => {
  const user = useSelector((state: RootState) => state.user.data);

  // const { handleChange, handleSubmit } = useReply();

  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const [data, setData] = useState('');
  // const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  // const handleChangeFile = ( e: React.ChangeEvent<HTMLInputElement>) => {
  //     setData((prev) => ({ ...prev, iamge: e.target.files![0]}))
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Api.post('/reply/post', {
        thread: Number(id),
        content: data,
      })
        .then(() => {
          toast({
            title: `success upload reply `,
            duration: 2000,
            position: 'top',
            status: 'success',
          });
        })
        .catch(() => {
          toast({
            title: `error upload reply `,
            duration: 2000,
            position: 'top',
            status: 'error',
          });
        });

      setData(''); // Reset nilai input setelah berhasil
      getThreadById();
      getThreadById();
    } catch (error) {
      toast({
        title: `error post reply because ${error}`,
        duration: 4000,
        status: 'error',
        position: 'top',
      });
    }
  };

  const getThreadById = async () => {
    try {
      const response = await Api.get(`/thread/${id}`);
      dispatch(STATE_THREAD_BY_ID(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex p={'3vh'} gap={'2vh'} w={'100%'} borderBottom={'1px solid #b2b2b2'}>
        <Avatar src={user.photo_profile} />
        <Input
          name="content"
          type="text"
          placeholder="What is Happening!? "
          border={'none'}
          onChange={handleChange}
        ></Input>

        {/* <FormLabel htmlFor="image">
          <SlPicture size={38} color="#005e0e" />
        </FormLabel>
        <Input
          type="file"
          id="image"
          name="image"
          onChange={handleChangeFile}
          accept="image/jpg, image/jpeg, image/png"
          hidden
        /> */}
        <Button bg={'#005e0e'} type="submit">
          Post
        </Button>
      </Flex>
    </form>
  );
};
