import { Box } from '@chakra-ui/react'
import { NavFollow } from '../atom/NavFollow'



export const Follows = () => {
  return (
    <Box
    w={{ base:'100%', md:'100%', lg:'700px'}}
    h={'100vh'}>

    <NavFollow/>

    </Box>
  )
}
