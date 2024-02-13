
import { Box } from '@chakra-ui/react'
import { Follwer } from '../components/Follwer'
import { ProfileHome } from '../components/ProfileHome'
import { CreateDev } from '../components/CreateDev'

export const RightSideBar = () => {
  const token = window.localStorage.getItem('token')

  return (
    <Box
        p={4}
        w={{ base:0, md:'0px', lg:'400px'}}
        display={{ base:'none', md:'none', lg:'none', xl:'inline-block'}}
        >
          { token && <ProfileHome /> }
        
        <Follwer/>
        <CreateDev/>
    </Box>
  )
}
