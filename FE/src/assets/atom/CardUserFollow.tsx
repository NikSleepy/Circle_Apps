import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react'
interface Followers {
    id:number
    fullName:string
    username:string
    photo_profile:string
    isFollow:boolean
  }

export const CardUserFollow = (props:Followers) => {


  return (
    <HStack my={4} px={5}>
        <Avatar
        src={`${props.photo_profile}`}
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
            _hover={{ color:'black', bg:'white'}}>
                {props?.isFollow ? 'follow' : 'usfollow'}
            </Button>
    </HStack>
  )
}
