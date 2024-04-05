import { Button, Flex, Text } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'

export const ButtonBack = () => {
  return (

        <Flex gap={3}  display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
            <Button bg={'none'} _hover={{bg:'none'}} gap={3}>
              <BiArrowBack color='white' size={30}/>
              <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>Back</Text>
            </Button>
        </Flex>
 
  )
}
