import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DataPost } from "../types/Type"
import Dummy from '../datas/dummy.json'

export const Follwer = () => {
    const [ follows, setFollows ] = useState<DataPost[]>([])

    useEffect(() => {
        setFollows(Dummy)
    },[])

  return (
    <Box
      borderRadius='20px'
      bg={'#262626'}
      p='20px'
      h='330px'
      my={3}
      w={{ base: "315px", md: "345px" }}
      alignItems='start'
      >
        <Text
            fontWeight={'bold'}
            
        >Suggested for you</Text>

        { follows?.map(( items ) => (
            <HStack my={4} key={items.id}>
            <Avatar
            src={`${items.picture}`}
            size={'md'}
            />
            <Box fontSize={'sm'}>
                <Text>{items.userName}</Text>
                <Text color={'#686868'}>@{items.fullName}</Text>
            </Box>
            <Button 
            ml={'auto'} 
            mr={'-9px'}
            borderRadius={'20px'}
            h={'30px'}
            bg={'none'}
            color={'white'}
            border={'1px solid '}
            _hover={{ color:'black', bg:'white'}}>
                Follows
            </Button>
        </HStack>
        ))}

        
        
        
    </Box>
  )
}
