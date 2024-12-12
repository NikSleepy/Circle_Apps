import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ButtonBack } from '../../../components/ButtonBack';
import { useUserByThread } from '../hooks/useUserByThread';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardThreadUserByThread } from './CardThreadUserByThread';
import { userLogin } from '../../../store/slice/UserSlice';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store/type';
import { usePostFollows } from '../../follows/hooks/usePostFollows';
import { useGetFollows } from '../../follows/hooks/useGetFollows';
import { useGetAllUser } from '../../search/hooks/useGetAllUser';
// import { FollowingsUser } from './FollowingsUser';

export const UserProfileByThread = () => {
  const boxBg = useColorModeValue('#262626 !important', '#111c44 !important');
  const mainText = useColorModeValue('white', 'white');
  const secondaryText = useColorModeValue('#686868', '#686868');
  const [ fetchagain, setFetchAgain ] = useState(false);

  const { userByThread,  threads, user } =
    useUserByThread();
  const { id } = useParams();
  const { handleSubmit } = usePostFollows();
  const { follow } = useGetFollows();
  const { searchFollow } = useGetAllUser();
  // console.log("dari followings",props)

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const handleFollowButtonClick = async () => {
    try {
      await handleSubmit(Number(user?.id));
      follow();
      searchFollow();
      dispatch(userLogin());
      userByThread(Number(id)); // panggil refetch setelah tindakan berhasil dilakukan
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    userByThread(Number(id));
  }, [fetchagain]);

  return (
    <Box>
      <ButtonBack />
      <Text fontWeight={'bold'} textAlign={'center'} fontSize={'30px'}>
        Profile {user?.fullName}
      </Text>
      {user?.photo_cover ? (
        <Image
          src={user?.photo_cover}
          objectFit={'cover'}
          w={'100%'}
          h={'190px'}
          borderRadius="20px"
          p={'10px'}
        />
      ) : (
        <Image
          src="/image/BGCARD.jpeg"
          objectFit={'cover'}
          w={'100%'}
          h={'150px'}
          borderRadius="20px"
          p={'10px'}
        />
      )}

      <Flex flexDirection="column" mx={'15px'}>
        <Center>
          <Avatar
            src={user?.photo_profile}
            border="5px solid red"
            borderColor={boxBg}
            width="120px"
            height="120px"
            mt="-60px"
            borderRadius="50%"
          />
        </Center>
        <Box
          display={'flex'}
          my={'12px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text fontWeight="600" color={mainText} fontSize="40px">
            {user?.fullName}
          </Text>

          <Button
            w={'150px'}
            bg={'none'}
            color={'white'}
            _hover={{ color: 'black', bg: 'white' }}
            h={'40px'}
            border={'1px solid'}
            onClick={() => handleFollowButtonClick()}
          >
            {user?.isFollow ? 'Unfollow' : 'Follow'}
          </Button>
          {/* <EditProfileModal/> */}
        </Box>

        <Text color={secondaryText} fontSize="lg" fontWeight="500">
          @{user?.username}
        </Text>

        <Text fontSize={'lg'}>{user?.description}</Text>

        <HStack my={'10px'}>
          <Text>{user?.followings}</Text>
          <Text color={secondaryText} fontSize="sm">
            Following
          </Text>
          <Text>{user?.followers}</Text>
          <Text color={secondaryText} fontSize="sm">
            Followers
          </Text>
        </HStack>
      </Flex>

      <Box
        w={'100%'}
        display={{
          base: 'none',
          sm: 'block',
          md: 'block',
          lg: 'block',
          xl: 'block',
        }}
      >
        <Tabs variant={'unStyled'} align="center" isFitted>
          <TabList>
            <Tab>Thread</Tab>
          </TabList>
          <TabIndicator w={'100%'} h={'2px'} bg={'#00b7f4'} />
          <TabPanels>
            <TabPanel>
              {threads.map((items) => (
                <CardThreadUserByThread
                  key={items.id}
                  id={items.id}
                  content={items.content}
                  image_thread={items.image_thread}
                  created_at={items.created_at}
                  numberOfReply={items.numberOfReply}
                  Likes={items.Likes}
                  isLike={items.isLike}
                  user={items.user}
                  refresh={() => setFetchAgain(!fetchagain)}
                />
              ))}
            </TabPanel>
            
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
