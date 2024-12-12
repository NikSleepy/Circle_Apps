import {
  Avatar,
  Box,
  // Button,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../store/slice/UserSlice';
// import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store/rootReducer';
import { EditProfileModal } from './ModalEditProfile';

export const ProfileHome = () => {
  const boxBg = useColorModeValue('#262626 !important', '#111c44 !important');
  const mainText = useColorModeValue('white', 'white');
  const secondaryText = useColorModeValue('#686868', '#686868');

  // const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userLogin());
  }, []);

  return (
    <>
      <Flex
        borderRadius="20px"
        bg={boxBg}
        p="20px"
        w={{ base: '315px', md: '345px' }}
        alignItems="start"
        direction="column"
      >
        <Text fontWeight={'bold'} mb={3}>
          My Profile
        </Text>
        {user?.photo_cover ? (
          <Image
            src={user?.photo_cover}
            objectFit={'cover'}
            w={'100%'}
            h={'80px'}
            borderRadius="10px"
          />
        ) : (
          <Image
            src="/image/BGCARD.jpeg"
            objectFit={'cover'}
            w={'100%'}
            h={'80px'}
            borderRadius="10px"
          />
        )}

        <Flex flexDirection="column">
          <Box>
            <Avatar
              src={user?.photo_profile}
              border="5px solid red"
              mx="20px"
              borderColor={boxBg}
              width="68px"
              height="68px"
              mt="-38px"
              borderRadius="50%"
            />
            <Box w={'150px'} ml={'150px'} mt={'-20px'}>
              {/* <Button
                ml={''}
                w={'150px'}
                bg={'none'}
                color={'white'}
                _hover={{ color: 'black', bg: 'white' }}
                h={'30px'}
                border={'1px solid'}
                onClick={() => navigate('/edit')}
              >
                Edit Profile
              </Button> */}
              <EditProfileModal/>
            </Box>
          </Box>
          <Text fontWeight="600" color={mainText} fontSize="xl">
            {user?.fullName}
          </Text>
          <Text color={secondaryText} fontSize="sm" fontWeight="500">
            @{user?.username}
          </Text>
          <Text fontSize={'sm'}>{user?.description}</Text>

          <HStack>
            <Text>{user.followings}</Text>
            <Text color={secondaryText} fontSize="sm">
              Following
            </Text>
            <Text>{user.followers}</Text>
            <Text color={secondaryText} fontSize="sm">
              Followers
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};
