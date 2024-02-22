import { Box, Flex, Text } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'


export const NavFollow = () => {
  return (
    <Box 
    bg={'#1d1d1d'}
    w={'100%'}
    display={{ base: 'none',sm: 'none' , md:'block', lg:'block', xl:'block'}}
    borderBottom={'1px solid #b2b2b2'}
    >   
          <Link to={'/'} >
            <Flex p={'10px'} gap={3}  display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
                    <BiArrowBack  size={30}/>
                    <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
            </Flex>
          </Link>
        
        <Flex gap={150} justifyContent={'center'} alignItems={'center'} p={'10px'}>
            <Text > For You </Text>
            <Text > Following </Text>
        </Flex>
    </Box>
  )
}
