import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { IoIosHome } from 'react-icons/io';
import { IoLogInOutline } from 'react-icons/io5';
import { MdPersonSearch } from 'react-icons/md';
import { PiHeartStraight } from 'react-icons/pi';
import { TbLogout2 } from 'react-icons/tb';
import { CreatePost } from '../../feature/threads/component/CreatePost';
import { Link } from 'react-router-dom';
// templateAreas={`"top" "buttom`} gridTemplateRows={`'80%' '20%'`}

export const NavHome = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'space-between'}
      p={5}
      h={'auto'}
      w={'auto'}
      position={'fixed'}
    >
      <Box h={'100%'} >
        <Text fontSize={'5xl'} fontWeight={'bold'} color="#04a51e" mb={'20px'}>
          circle
        </Text>

        <Link to={'/'}>
          <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>
            <IoIosHome size={25} color="white" />
            <Text>Home</Text>
          </Flex>
        </Link>

        <Link to={'/search'}>
          <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>
            <MdPersonSearch size={25} color="white" />
            <Text>Search</Text>
          </Flex>
        </Link>

        <Link to={'/follow'}>
          <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>
            <PiHeartStraight size={25} color="white" />
            <Text>Follows</Text>
          </Flex>
        </Link>

        <Link to={'/myprofile'}>
          <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>
            <CgProfile size={25} color="white" />
            <Text>Profile</Text>
          </Flex>
        </Link>

        <Button
          bg={'#04a51e'}
          color={'white'}
          borderRadius={'20px'}
          my={6}
          py={3}
          px={10}
          _hover={{ color: 'black', background: 'white' }}
          onClick={onOpen}
        >
          Create Post
        </Button>

        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          size={'xl'}
        >
          <ModalOverlay />
          <ModalContent bg={'#1d1d1d'} color={'white'}>
            <ModalHeader>Created Post</ModalHeader>
            <ModalBody>
              <CreatePost onClose={onClose}/>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="none" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button colorScheme='none'>Post</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Box display={'flex'} h={'50px'} alignItems={'end'} mt={240}>
        {token ? (
          <Link to="/login" onClick={logout}>
            <Flex display={'flex'} gap={3} paddingBottom={'20px'}>
              <TbLogout2 size={'30px'} />
              <Text fontSize={'lg'}>Logout</Text>
            </Flex>
          </Link>
        ) : (
          <Link to="/login">
            <Flex display={'flex'} gap={3} paddingBottom={'20px'}>
              <IoLogInOutline size={'30px'} />
              <Text fontSize={'lg'}>Login</Text>
            </Flex>
          </Link>
        )}
      </Box>
    </Flex>
  );
};
