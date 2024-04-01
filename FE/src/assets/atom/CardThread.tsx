
import { Box, Flex, Avatar, Text, Image, Button } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa';
import { LiaComment } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { useThreadLikes } from '../../feature/threads/hooks/useThreadLikes';

interface Thread {
    id:number,
    content:string,
    image_thread:string,
    created_at:string,
    user:number,
    username:string,
    fullName:string,
    photo_profile:string,
    reply:number,
    likes:number,
    isLikes:boolean

    }


export const CardPost = (  items  : Thread ) => {
    // const [ like, setLike ] = useState<boolean>(false)
    
    const { handleLikes } = useThreadLikes()
    
    const convertTime = ( time:string ) => {
        const date = new Date(time)
        const timeConvert = date.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return timeConvert
    }

    // const follow = () => {
    //     if (!like){
    //         setLike(true)
    //     } else {
    //         setLike(false)
    //     }
    // }

   
    
  return (
    
    <Box 
        display='flex'
        borderBottom={'1px solid #b2b2b2'}
        p="3vh"
        pb={'1vh'}
        
        
         >
            <Flex  >
            <Avatar
                src={items?.photo_profile}
            />
            </Flex>

            <Box 
                w='90%'
                ml='10px'
                
                
                >
                    <Box display={{ base: 'grid', sm: 'flex' }} gap={{base:'0px', sm:'5px'}} mb='5px'>
                        <Text fontWeight={'bold'}>{items?.username} </Text>
                        <Text color='#909090'>@{items?.fullName} <span>&bull;</span> {convertTime(items?.created_at)} </Text>
                    </Box>

                    <Text fontSize={'sm'}>
                        {items?.content}
                    </Text>
                    
                    <Image
                            src={items?.image_thread}
                            
                            w={'70%'}
                            my={5}
                            borderRadius={10}
                        />

                    <Flex mt='7px' ml={-19}>
                    
                        <Button  colorScheme='#262626' onClick={()=> handleLikes(items.id)}>
                        { items.isLikes ? <FaHeart size={20} color='red' /> : <FaHeart size={20} /> }
                        <Text color='#909090' ml={'5px'} mr={'20px'}>{items?.likes} </Text>
                        </Button>
                        <Button colorScheme='#262626'>
                            <Link to={`/thread/${items?.id}`}>
                                <Flex>
                                    <LiaComment size={20} />
                                    <Text color='#909090' ml={'5px'}>{items?.reply} Replies</Text>
                                </Flex>
                            </Link>
                        </Button>
                    </Flex>
            </Box>
        </Box>
  )
}
