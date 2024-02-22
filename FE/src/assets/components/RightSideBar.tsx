
import { Box } from '@chakra-ui/react'
import { Follwer } from '../elements/Follwer'
import { ProfileHome } from '../elements/ProfileHome'
import { CreateDev } from '../elements/CreateDev'

export const RightSideBar = () => {
  const token = sessionStorage.getItem('token')

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
