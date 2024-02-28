import { Avatar, Box, Button, Flex, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import {  useEffect } from "react";
// import { api } from "../libs/api";
// import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/type";
import { useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { userLogin } from "../../store/slice/UserSlice";

// interface Profile {
//   id: number,
//   username: string,
//   fullName: string,
//   password: string,
//   email: string,
//   description: string,
//   photo_cover: string,
//   photo_profile: string
// }
export const ProfileHome = () => {
  const boxBg = useColorModeValue("#262626 !important", "#111c44 !important");
  const mainText = useColorModeValue("white", "white");
  const secondaryText = useColorModeValue("#686868", "#686868");

  // const [ profile, setProfile ] = useState<Profile>()

  // const user = localStorage.getItem('user')
//   const token = sessionStorage.getItem('token')
//   // console.log(token);
  
//   const config = {
//     headers: { Authorization: `Bearer ${token} `}
// }
  
//   const getProfile = async () => {
//     try {
//       const response = await api.get(`/users/client`,config)
//       // console.log("profile",response.data);
      
//       setProfile(response.data)
      
//     } catch (error) {
//       console.log(error)
//     }
    
//   }

//   React.useEffect (() => {
//     getProfile();
    
//   },[])
  
  const user = useSelector((state: RootState) => state.user.data)
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()
  
  useEffect(() => {
    dispatch(userLogin())
  },[])



  return (
    <Flex
      borderRadius='20px'
      bg={boxBg}
     
      p='20px'
      w={{ base: "315px", md: "345px" }}
      alignItems='start'
      direction='column'
      >
        
        <Text fontWeight={'bold'} mb={3}>My Profile</Text>
        { user?.photo_cover ?
          <Image
          src={user?.photo_cover}
          objectFit={'cover'}
          w={'100%'}
          h={'80px'}
          borderRadius='10px'
        /> :


        <Image
          
          src="https://i.ibb.co/xmP2pS6/Profile.png"
          objectFit={'cover'}
          w={'100%'}
          h={'80px'}
          borderRadius='10px'
        />
      }
        
        <Flex flexDirection='column'>
        <Box>
          <Avatar
            src={user?.photo_profile}
            border='5px solid red'
            mx='20px'
            borderColor={boxBg}
            width='68px'
            height='68px'
            mt='-38px'
            borderRadius='50%'
          />
          <Box ml={'auto'} mt={'-20px'}>

            <Button 
            ml={'150px'}
            w={'150px'}
            bg={'none'}
            color={'white'}
            _hover={{ color: 'black', bg:'white'}}
            h={'30px'}
            border={'1px solid'}
            >
              Edit Profile
            </Button>
          </Box>

          </Box>
          <Text
            fontWeight='600'
            color={mainText}
            fontSize='xl'>
            {user?.fullName}
          </Text>
          <Text
            color={secondaryText}
            fontSize='sm'
            fontWeight='500'>
            @{user?.username}
          </Text>
          <Text 
          fontSize={'sm'}
          >
            {user?.description}
          </Text>

          <HStack>
            <Text>100</Text>
            <Text color={secondaryText} fontSize='sm'>Following</Text>
            <Text>300</Text>
            <Text color={secondaryText} fontSize='sm'>Followers</Text>
          </HStack>
        </Flex>

       
  </Flex>
  )
}
