import { Avatar, Box, Center, Flex, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { Follows } from '../../../assets/components/Follows';

export const MyProfile = () => {
    const boxBg = useColorModeValue("#262626 !important", "#111c44 !important");
    const mainText = useColorModeValue("white", "white");
    const secondaryText = useColorModeValue("#686868", "#686868");
    const user = useSelector((state: RootState) => state.user.data)

  return (
    <Box
    

      >
        
        <Text fontWeight={'bold'} my={6} textAlign={'center'} fontSize={'30px'}>My Profile</Text>
        { user?.photo_cover ?
          <Image
          src={user?.photo_cover}
          objectFit={'cover'}
          w={'100%'}
          h={'150px'}
          borderRadius='20px'
          p={'10px'}
        /> 
        :


        <Image
          
          src="https://i.ibb.co/xmP2pS6/Profile.png"
          objectFit={'cover'}
          w={'100%'}
          h={'150px'}
          borderRadius='20px'
          p={'10px'}
          
        />
      }
        
        <Flex flexDirection='column' mx={'15px'}>
            <Center >
                <Avatar
                    src={user?.photo_profile}
                    border='5px solid red'
                    borderColor={boxBg}
                    width='120px'
                    height='120px'
                    mt='-60px'
                    borderRadius='50%'
                />
                {/* <Box ml={'auto'} mt={'-20px'}>

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
                </Box> */}

            </Center>

          <Text
            my={'12px'}
            fontWeight='600'
            color={mainText}
            fontSize='40px'>
            {user?.fullName}
          </Text>

          <Text
            color={secondaryText}
            fontSize='lg'
            fontWeight='500'>
            @{user?.username}
          </Text>

          <Text 
          fontSize={'lg'}
          >
            {user?.description}
          </Text>

          <HStack my={'10px'}>
            <Text>100</Text>
            <Text color={secondaryText} fontSize='sm'>Following</Text>
            <Text>300</Text>
            <Text color={secondaryText} fontSize='sm'>Followers</Text>
          </HStack>


          <Follows/>

          
        </Flex>

       
  </Box>
  )
}
