import React from 'react'
import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store/type';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../store/slice/UserSlice';
import { useGetAllUser } from '../../search/hooks/useGetAllUser';
import { useGetFollows } from '../../follows/hooks/useGetFollows';
import { usePostFollows } from '../../follows/hooks/usePostFollows';
import { useGetFollowers } from '../../followers/hooks/useGetFollowers';
import { useGetFollowings } from '../../followings/hooks/useGetFollowings';
interface Followers {
    id: number;
    fullName: string;
    username: string;
    photo_profile: string;
    isFollow: boolean;
  }
export const FollowingsUser = (props: Followers) => {
    const { followers } = useGetFollowings();
    const { handleGet } = useGetFollowers();
    const { handleSubmit } = usePostFollows();
    const { follow } = useGetFollows();
    const { searchFollow } = useGetAllUser();
    
    // console.log("dari followings",props)
  
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();
  
    const handleFollowButtonClick = async () => {
      try {
        await handleSubmit(props.id);
        follow();
        handleGet();
        searchFollow();
        dispatch(userLogin());
        followers(); // panggil refetch setelah tindakan berhasil dilakukan
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <HStack my={4} px={5}>
      <Avatar src={`${props.photo_profile}`} size={'md'} />

      <Box fontSize={'sm'} textAlign={'start'}>
        <Box pl={1}>
          <Text>{props.username}</Text>
        </Box>
        <Box>
          <Text color={'#686868'}>@{props.fullName}</Text>
        </Box>
      </Box>

      <Button
        ml={'auto'}
        mr={'-9px'}
        borderRadius={'20px'}
        h={'30px'}
        bg={'none'}
        color={'white'}
        border={'1px solid '}
        _hover={{ color: 'black', bg: 'white' }}
        onClick={handleFollowButtonClick}
      >
        {props?.isFollow ? 'unfollows' : 'follow'}
      </Button>
    </HStack>
  )
}
