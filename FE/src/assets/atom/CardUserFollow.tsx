import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react'
import { useGetFollowings } from '../../feature/followings/hooks/useGetFollowings'
import { usePostFollows } from '../../feature/follows/hooks/usePostFollows'
import { useGetFollowers } from '../../feature/followers/hooks/useGetFollowers'
interface Followers {
    id:number
    fullName:string
    username:string
    photo:string
    followings:boolean
  }

export const CardUserFollow = (props:Followers) => {
  const {  followers } = useGetFollowings()
  const { handleGet} = useGetFollowers()
  const { handleSubmit } = usePostFollows()
  // console.log("dari followings",props)

  const handleFollowButtonClick = async () => {
    try {
        await handleSubmit(props.id); 
         handleGet();
         followers(); // panggil refetch setelah tindakan berhasil dilakukan
    } catch (error) {
        console.log(error);
    }
}

  console.log("card user",props.followings, props.username)


  return (
    <HStack my={4} px={5}>
        <Avatar
        src={`${props.photo}`}
        size={'md'}
        />

            <Box fontSize={'sm'}  textAlign={'start'}>
                <Box pl={1}>
                <Text>{props.username}</Text>
                </Box>
                <Box>
                <Text color={'#686868'}>@{props.fullName}</Text>
                </Box>
            </Box>

 
            <Button 
            ml={'auto'} 
            mr={'-9px'}
            borderRadius={'20px'}
            h={'30px'}
            bg={'none'}
            color={'white'}
            border={'1px solid '}
            _hover={{ color:'black', bg:'white'}}
            onClick={handleFollowButtonClick}>

              {props?.followings ? "unfollows" : "follow"}
                
            </Button>


    </HStack>
  )
}
