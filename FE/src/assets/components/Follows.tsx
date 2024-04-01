import { Box } from '@chakra-ui/react'
import { NavFollow } from '../atom/NavFollow'
import { ButtonBack } from '../atom/ButtonBack'



export const Follows = () => {
  return (
    <Box
    w={'100%'}
    h={'100vh'}>
    <ButtonBack/>
    <NavFollow/>

    </Box>
  )
}
