import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react"
// import { useEffect, useState } from "react"
// import { DataPost } from "../types/Type"
// import Dummy from '../datas/dummy.json'
// import { api } from "../libs/api"
import { useGetFollows } from "../../feature/follows/hooks/useGetFollows"
// interface Followers {
//   id:number
//   fullName:string
//   username:string
//   photo_profile:string
//   replies:string[]
//   likes:string[]
// }
export const Follwer = () => {
    // const [ follows, setFollows ] = useState<Followers[]>([])

    // const token = sessionStorage.getItem('token')
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // }
    // const followers = async () => {
    //   try {
    //     const response = await api.get('/users', config)
    //     setFollows(response.data.data)
        
    //   } 
    //   catch (error) {
    //     console.log(error);
    //   }
    // }
    // // console.log(follows)

    // useEffect(() => {
    //     followers()
    // },[])
    const { follows } = useGetFollows()

  return (
    <Box
      borderRadius='20px'
      bg={'#262626'}
      p='20px'
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
            src={`${items.photo_profile}`}
            size={'md'}
            />
            <Box fontSize={'sm'}>
                <Text>{items.username}</Text>
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

              {items?.isFollow ? 'Follows' : 'unfollows' }
                
            </Button>
        </HStack>
        ))}

        
        
        
    </Box>
  )
}
