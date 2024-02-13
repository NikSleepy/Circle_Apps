
import { Box, Flex, Avatar, Text, Image, Button } from '@chakra-ui/react'
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { LiaComment } from "react-icons/lia";
import { DataPost } from '../types/Type';


export const CardPost = (  items  : DataPost ) => {
    const [ like, setLike ] = useState<boolean>(false)
    
    

    const follow = () => {
        if (!like){
            setLike(true)
        } else {
            setLike(false)
        }
    }

  return (
    <Box 
        display='flex'
        borderBottom={'1px solid #b2b2b2'}
        p="3vh"
        pb={'1vh'}
        
        
         >
            <Flex  >
            <Avatar
                src={`${items.picture}`}
            />
            </Flex>

            <Box 
                w='90%'
                ml='10px'
                
                >
                    <Box display={{ base: 'grid', sm: 'flex' }} gap={{base:'0px', sm:'5px'}} mb='5px'>
                        <Text fontWeight={'bold'}>{items.userName} </Text>
                        <Text color='#909090'> @{items.fullName} <span>&bull;</span> {items.postAt} </Text>
                    </Box>

                    <Text fontSize={'sm'}>
                        {items.content}
                    </Text>

                    <Image
                        src={`${items.image_thread}`}
                        w={'70%'}
                        my={5}
                        borderRadius={10}
                    />

                    <Flex mt='7px'>
                    
                        <Button  colorScheme='#262626' onClick={follow}>
                        { like ? <FaHeart size={20} color='red' /> : <FaHeart size={20} /> }
                        <Text color='#909090' ml={'5px'} mr={'20px'}>{items.likes} </Text>
                        </Button>
                        <Button colorScheme='#262626'>
                        <LiaComment size={20} />
                        <Text color='#909090' ml={'5px'}>{items.replies} Replies</Text>
                        </Button>
                    </Flex>
            </Box>
        </Box>
  )
}
