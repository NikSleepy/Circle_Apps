import { Box } from '@chakra-ui/react'
import { NavbarHpTop } from '../components/NavbarHpTop'
import { NavbarHp } from '../components/NavbarHpButtom'
import { NavHome } from '../fregmentsHomePages/NavHome'
import { RightSideBar } from '../fregmentsHomePages/RightSideBar'
// import { Outlet } from 'react-router-dom'

export const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <Box
    
    color={'white'}
    h={'100%'}
    >
      <Box display={{base:'circle', sm:'circle', md:'none',lg:'none', xl:'none'}}  w={'full'} zIndex={9999}>
        <NavbarHpTop/>
      </Box>

      <Box display={'flex'}>
        <Box w={'40vh'} display={{base:'none', sm:'none', md:'block',lg:'block'}} borderRight={'1px solid #b2b2b2'} >
          <NavHome/>
        </Box>


        <Box 
        // w={{ base:'100%', md:'100%', lg:'700px'}}
        // w={'100%'} 
        // h={'100%'}
        w={'100ch'}
        >
            

        {children}
            
          {/* <Outlet/> */}

        </Box>


        <Box  display={{base:'none', sm:'none',md:'block',lg:'block'}} borderLeft={'1px solid #b2b2b2'} >
          <RightSideBar/>
        </Box>
      </Box>

      <Box display={{base:'circle', sm:'circle', md:'none',lg:'none'}} position={'fixed'} w={'full'} zIndex={9999} bottom={0}>
        <NavbarHp/>
      </Box>
    
    </Box>
  )
}
