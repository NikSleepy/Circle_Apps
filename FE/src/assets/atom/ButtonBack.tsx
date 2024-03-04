import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export const ButtonBack = () => {
  return (
    <Link to={'/'} >
        <Flex p={'10px'} gap={3}  display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
            <BiArrowBack  size={30}/>
            <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
        </Flex>
    </Link>
  )
}
