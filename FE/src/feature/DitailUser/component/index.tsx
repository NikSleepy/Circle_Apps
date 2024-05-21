import { Avatar, Box, Button, Center, Flex, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { ButtonBack } from '../../../components/ButtonBack';
import { useNavigate } from 'react-router-dom';
import { ContentDetail } from './ContentDetail';

export const MyProfile = () => {
    const boxBg = useColorModeValue("#262626 !important", "#111c44 !important");
    const mainText = useColorModeValue("white", "white");
    const secondaryText = useColorModeValue("#686868", "#686868");
    const user = useSelector((state: RootState) => state.user.data)
    const navigate = useNavigate()

  return (
    <Box
      >
        <ButtonBack/>
        <Text fontWeight={'bold'}  textAlign={'center'} fontSize={'30px'}>My Profile</Text>
        { user?.photo_cover ?
          <Image
          src={user?.photo_cover}
          objectFit={'cover'}
          w={'100%'}
          h={'190px'}
          borderRadius='20px'
          p={'10px'}
        /> 
        :
        <Image
          src="/image/BGCARD.jpeg"
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
   

            </Center>
            <Box display={'flex'} my={'12px'} alignItems={'center'}  justifyContent={'space-between'}>
              <Text
                fontWeight='600'
                color={mainText}
                fontSize='40px'>
                {user?.fullName}
              </Text>
              
              <Button 
              w={'150px'}
              bg={'none'}
              color={'white'}
              _hover={{ color: 'black', bg:'white'}}
              h={'40px'}
              border={'1px solid'}
              onClick={()=> navigate('/edit')}
              >
                Edit Profile
              </Button>
            </Box>


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
            <Text>{user.followings}</Text>
            <Text color={secondaryText} fontSize='sm'>Following</Text>
            <Text>{user.followers}</Text>
            <Text color={secondaryText} fontSize='sm'>Followers</Text>
          </HStack>


          
        </Flex>
          <ContentDetail/>

       
  </Box>
  )
}
