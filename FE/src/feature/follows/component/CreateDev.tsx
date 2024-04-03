import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'



export const CreateDev = () => {
  return (
    <Box
    borderRadius='20px'
    bg={'#262626'}
    h='50px'
    w={{ base: "315px", md: "345px" }}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
>
        <Flex 
        gap={3} 
        fontSize={'sm'}
        >
      
            <Text>Developed Your Name </Text>
            <HStack color={'#b2b2b2'}>
                <span>&bull;</span>
                <FaGithub size={20}/>
                <FaLinkedin size={20}/>
                <FaFacebook size={20}/>
                <FiInstagram size={20}/>

            </HStack>
        </Flex>

        
    </Box>
  )
}
