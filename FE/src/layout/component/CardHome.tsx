//code untuk extention buat sebuah function "rafc"

import { Box, Text } from '@chakra-ui/react';
import { CardPost } from '../../feature/threads/component/CardThread';
// import { CreatePost } from '../../feature/threads/component/CreatePost';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';
import { useDispatch } from 'react-redux';
import { dataThreads } from '../../store/slice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/rootReducer';

export const CardHome = () => {
  const navigate = useNavigate();

  if (!sessionStorage.getItem('token')) {
    navigate('/login');
  }

  const threads = useSelector((state: RootState) => state.thread.thread);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(dataThreads());
  }, []);

  return (
    <>
      <Box h={'100%'}>
        <Text
          display={{
            base: 'none',
            sm: 'none',
            md: 'block',
            lg: 'block',
            xl: 'block',
          }}
          fontSize={'3xl'}
          fontWeight={'bold'}
          mx={'15px'}
          pt={'4vh'}
          pb={'2vh'}
        >
          Home
        </Text>

        {/* <Box
          borderBottom={'1px solid #b2b2b2'}
          display={{
            base: 'none',
            sm: 'block',
            md: 'block',
            lg: 'block',
            xl: 'block',
          }}
        >
          <CreatePost />
        </Box> */}

        {/* bagian card */}

        {threads?.map((data, index) => {
          return (
            <Box key={index}>
              <CardPost
                id={data?.id}
                content={data?.content}
                image_thread={data?.image_thread}
                created_at={data?.created_at}
                user={data?.user?.id}
                username={data?.user?.username}
                fullName={data?.user?.fullName}
                photo_profile={data?.user?.photo_profile}
                reply={data?.numberOfReply}
                likes={data?.likes}
                isLikes={data?.isLikes}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};
