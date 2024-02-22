import { Avatar, Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'

export const Search = () => {
  return (
    <Box
    
    w={'100%'}
    h={'100%'}
    
    >

          <Link to={'/'} >
            <Flex p={'10px'} gap={3} display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
                <BiArrowBack  size={30}/>
                <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
            </Flex>
          </Link>
        <Flex>
            <InputGroup m={'10px'} size={'lg'}>
                <InputLeftElement pointerEvents='none' >
                    <Avatar src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg" size={'sm'} />
                </InputLeftElement>
                <Input type='text' placeholder='Search' />
            </InputGroup>
        </Flex>



    </Box>
  )
}
