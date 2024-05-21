import { Button, Flex, Text } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export const ButtonBack = () => {
  const navigate = useNavigate()
  return (

        <Flex gap={3}  display={{ base: 'none',sm: 'flex' , md:'flex', lg:'flex', xl:'flex'}}>
            <Button bg={'none'} _hover={{bg:'none'}} gap={3} onClick={()=> navigate(-1)}>
              <BiArrowBack color='white' size={30}/>
              <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>Back</Text>
            </Button>
        </Flex>
 
  )
}
