import { Avatar, Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import { SlPicture } from 'react-icons/sl'

export const CreatePost = () => {
  return (
    <Flex 
        p={'3vh'}  
        gap={'2vh'} 
        w={'90%'}>
        <Avatar
            src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg"/>
                    
        <Input type="text" placeholder="What is Happening!? " border={'none'}></Input>
        <FormLabel htmlFor="image">
            <SlPicture size={38} color="#005e0e"/>
        </FormLabel>
        <Input type="file" id="image" hidden/>  
        <Button bg={'#005e0e'}>Post</Button>
    </Flex>
  )
}
