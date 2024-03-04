import React, { useEffect } from 'react'
import { CardUserFollow } from './CardUserFollow'
import { Box } from '@chakra-ui/react'
import { useGetFollowers } from '../../feature/followers/hooks/useGetFollowers'

export const Followers = () => {
    
  
    const { followers, handleGet } = useGetFollowers()
    console.log("di followers", followers)
    useEffect(() => {
        handleGet()
    },[])
  return (
    <Box>
      {/* <Text>bang</Text> */}
        {followers?.map((items) => (
            <CardUserFollow 
            key={items.id}
            id={items.id}
            username={items.username}
            fullName={items.fullName}
            photo={items.photo}
            followings={items.followers}/>
            
        ))}
    </Box>
  )
}
