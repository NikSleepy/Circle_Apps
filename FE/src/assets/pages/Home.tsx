import { Box} from '@chakra-ui/react'
// import React from 'react'
import { CardHome } from '../fregments/CardHome'
import { NavHome } from '../fregments/NavHome'
import { RightSideBar } from '../fregments/RightSideBar'
import { NavbarHp } from '../components/NavbarHpButtom'
import { NavbarHpTop } from '../components/NavbarHpTop'

export const Home = () => {


  return (
    <Box
    bg={'#1d1d1d'}
    color={'white'}
    
    >
      <Box display={{base:'circle', sm:'circle', md:'none',lg:'none', xl:'none'}}  w={'full'} zIndex={9999}>
        <NavbarHpTop/>
      </Box>

      <Box display={'flex'}>
        <Box w={'250px'} display={{base:'none', sm:'none', md:'block',lg:'block'}} >
          <NavHome/>
        </Box>
        <Box>
          <CardHome/>
        </Box>
        <Box display={{base:'none', sm:'none',md:'block',lg:'block'}}  >
          <Box>

          <RightSideBar/>
          </Box>
        </Box>
      </Box>

      <Box display={{base:'circle', sm:'circle', md:'none',lg:'none'}} position={'fixed'} w={'full'} zIndex={9999} bottom={0}>
        <NavbarHp/>
      </Box>
    
    </Box>
  )
}
