// import React, { useEffect } from 'react'
import { CardUserFollow } from '../../../components/CardUserFollow';
import { Box } from '@chakra-ui/react';
// import { useGetFollowers } from '../../feature/followers/hooks/useGetFollowers'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';

export const Followers = () => {
  const followers = useSelector((state: RootState) => state.followers);

  return (
    <Box>
      {followers?.map((items) => (
        <CardUserFollow
          key={items.id}
          id={items.id}
          username={items.username}
          fullName={items.fullName}
          photo_profile={items.photo_profile}
          isFollow={items.isFollow}
        />
      ))}
    </Box>
  );
};
