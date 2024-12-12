import { Avatar, Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { LiaComment } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { PostReplys } from '../../feature/threads/component/CreateReplys';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';
import { useReply } from '../../feature/threads/hooks/useReply';
import { Api } from '../../libs/api';
import { ButtonBack } from '../../components/ButtonBack';

export const DetailThreads = () => {
  const { getThreadById } = useReply();

  const threadById = useSelector((state: RootState) => state.threadById);

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

  const handleLikes = async (id: number) => {
    try {
      const data = {
        thread: id,
      };

      await Api.post('/thread/like', data);
      getThreadById();
    } catch (error) {
      console.log('error in post like', error);
    }
  };

  useEffect(() => {
    getThreadById();
  }, []);

  return (
    <Box>
      <ButtonBack />

      <Box borderBottom={'1px solid #b2b2b2'} p="3vh" pb={'1vh'}>
        <Flex mb={'20px'}>
          <Avatar src={threadById?.user?.photo_profile} mr={'10px'} />
          <Box gap={{ base: '0px', sm: '5px' }} mb="5px">
            <Text fontWeight={'bold'}>{threadById?.user?.fullName}</Text>
            <Text color="#909090">{threadById?.user?.username}</Text>
          </Box>
        </Flex>

        <Box w="90%" ml="10px">
          <Text fontSize={'sm'}>{threadById?.content}</Text>

          <Image
            src={threadById?.image_thread}
            w={'70%'}
            my={5}
            borderRadius={10}
          />

          <Flex mt="7px" ml={-19}>
            <Button
              colorScheme="#262626"
              onClick={() => handleLikes(threadById.id)}
            >
              {threadById.isLikes ? (
                <FaHeart size={20} color="red" />
              ) : (
                <FaHeart size={20} />
              )}
              <Text color="#909090" ml={'5px'} mr={'20px'}>
                {threadById?.likes}{' '}
              </Text>
            </Button>
            <Button colorScheme="#262626">
              <Link to={`/thread/${threadById.id}`}>
                <Flex>
                  <LiaComment size={20} />
                  <Text color="#909090" ml={'5px'}>
                    {threadById?.numberOfReply} Replies
                  </Text>
                </Flex>
              </Link>
            </Button>
          </Flex>
        </Box>
      </Box>

      <PostReplys />

      {threadById?.reply?.map((items) => (
        <Box
          display="flex"
          borderBottom={'1px solid #b2b2b2'}
          p="3vh"
          pb={'1vh'}
          key={items?.id}
        >
          <Flex>
            <Avatar src={items?.user?.photo_profile} />
          </Flex>

          <Box w="90%" ml="10px">
            <Box
              display={{ base: 'grid', sm: 'flex' }}
              gap={{ base: '0px', sm: '5px' }}
              mb="5px"
            >
              <Text fontWeight={'bold'}>{items?.user?.username}</Text>
              <Text color="#909090">
                @{items?.user?.fullName}
                <span>&bull;</span> {convertTime(items?.created_at)}
              </Text>
            </Box>

            <Text fontSize={'sm'}>{items?.content}</Text>

            <Image w={'70%'} my={5} borderRadius={10} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
