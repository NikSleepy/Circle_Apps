import { Avatar, Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LiaComment } from 'react-icons/lia';
import { useUserByThread } from '../hooks/useUserByThread';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface IData {
  id: number;
  content: string;
  image_thread: string;
  created_at: string;
  numberOfReply: number;
  Likes: number;
  isLike: boolean;
  user: {
    id: number;
    username: string;
    fullName: string;
    photo_profile: string;
  };
  refresh: () => void;
}

export const CardThreadUserByThread = (items: IData) => {
  const { handleLikes } = useUserByThread();

  const convertTime = (time: string) => {
    const date = new Date(time);
    const timeConvert = date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return timeConvert;
  };

  // console.log(items);
  return (
    <Box
      pt={'10px'}
      display="flex"
      borderBottom={'1px solid #b2b2b2'}
      pb={'1vh'}
      w={'100%'}
    >
      <Avatar src={items?.user.photo_profile} />

      <Box w="90%" ml="10px">
        <Box
          display={{ base: 'grid', sm: 'flex' }}
          gap={{ base: '0px', sm: '5px' }}
          mb="5px"
        >
          <Box
            display={{ base: 'grid', sm: 'flex' }}
            gap={{ base: '0px', sm: '5px' }}
          >
            <Text fontWeight={'bold'}>{items?.user.username} </Text>
            <Text color="#909090">
              @{items?.user.fullName} <span>&bull;</span>{' '}
              {convertTime(items?.created_at)}{' '}
            </Text>
          </Box>
          <Box ml="auto" position="relative">
            <Menu>
              <MenuButton>
                <BsThreeDotsVertical />
              </MenuButton>
              <MenuList ml={-200} color={'black'} >
                <MenuItem  onClick={() => alert('Laporkan clicked')}>
                  Report
                </MenuItem>
                {/* <MenuItem onClick={() => alert('Delete clicked')}>
                  Delete
                </MenuItem> */}
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <Text fontSize={'sm'} textAlign={'start'}>
          {items?.content}
        </Text>

        <Box display={'flex'}>
          <Image src={items?.image_thread} w={'70%'} my={5} borderRadius={10} />
        </Box>
        <Flex mt="7px" ml={-19}>
          <Button
            colorScheme="#262626"
            onClick={() => {
              handleLikes(items.id);
              items.refresh();
            }}
          >
            {items.isLike ? (
              <FaHeart size={20} color="red" />
            ) : (
              <FaHeart size={20} />
            )}
            <Text color="#909090" ml={'5px'} mr={'20px'}>
              {items?.Likes}{' '}
            </Text>
          </Button>
          <Button colorScheme="#262626">
            <Link to={`/thread/${items?.id}`}>
              <Flex>
                <LiaComment size={20} />
                <Text color="#909090" ml={'5px'}>
                  {items?.numberOfReply} Replies
                </Text>
              </Flex>
            </Link>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
