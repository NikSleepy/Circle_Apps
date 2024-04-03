import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { LiaComment } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import { useThreadLikes } from '../feature/threads/hooks/useThreadLikes'
interface IData {
    data: { 
    id:number,
    content:string,
    image_thread:string,
    created_at:string,
    numberOfReply:number,
    likes:number,
    isLikes:boolean,
    user:{
        id:number,
        username:string,
        fullName:string,
        photo_profile:string

    }
    }   
}

export const CardUserThread = ( items: IData) => {
    const { handleLikes } = useThreadLikes()
    
    const convertTime = ( time:string ) => {
        const date = new Date(time)
        const timeConvert = date.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return timeConvert
    }

  return (
    <Box
    pt={'10px'}
    display='flex'
    borderBottom={'1px solid #b2b2b2'}
    pb={'1vh'}
    w={'100%'} 
     >

        <Avatar src={items?.data.user.photo_profile}/>

        <Box 
            w='90%'
            ml='10px'
            >
                <Box display={{ base: 'grid', sm: 'flex' }} gap={{base:'0px', sm:'5px'}} mb='5px'>
                    <Text fontWeight={'bold'}>{items?.data.user.username} </Text>
                    <Text color='#909090'>@{items?.data.user.fullName} <span>&bull;</span> {convertTime(items?.data.created_at)} </Text>
                </Box>

                <Text fontSize={'sm'} textAlign={'start'}>
                    {items?.data.content}
                </Text>
                
                <Box display={'flex'}>

                <Image
                        src={items?.data.image_thread}
                        w={'70%'}
                        my={5}
                        borderRadius={10}
                        />
                </Box>
                <Flex mt='7px' ml={-19}>
                
                    <Button  colorScheme='#262626' onClick={()=> handleLikes(items.data.id)}>
                    { items.data.isLikes ? <FaHeart size={20} color='red' /> : <FaHeart size={20} /> }
                    <Text color='#909090' ml={'5px'} mr={'20px'}>{items?.data.likes} </Text>
                    </Button>
                    <Button colorScheme='#262626'>
                        <Link to={`/thread/${items?.data.id}`}>
                            <Flex>
                                <LiaComment size={20} />
                                <Text color='#909090' ml={'5px'}>{items?.data.numberOfReply} Replies</Text>
                            </Flex>
                        </Link>
                    </Button>
                </Flex>
        </Box>
    </Box>
  )
}
