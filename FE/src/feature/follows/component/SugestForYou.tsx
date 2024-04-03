import { Box,Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/type"
import { useEffect } from "react"
import { useGetFollows } from "../hooks/useGetFollows"
import { CardUserFollow } from "../../../components/CardUserFollow"

export const Follwer = () => {

    const follows = useSelector((state : RootState)=> state.follows ) 
    const { follow } = useGetFollows()
    
    useEffect(()=> {
      follow()
    },[])

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

        {follows.map((items, index )=> (
          <CardUserFollow
          key={index}
          id={items.id}
          username={items.username}
          fullName={items.fullName}
          photo_profile={items.photo_profile}
          isFollow={items.isFollow}
          />
        ))}

    </Box>
  )
}
