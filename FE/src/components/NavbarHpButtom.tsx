import { Box, Flex } from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg'
import { FaRegPlusSquare } from 'react-icons/fa'
import { IoIosHome } from 'react-icons/io'
import { MdPersonSearch } from 'react-icons/md'
import { PiHeartStraight } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const NavbarHp = () => {
  return (
    <Box 
    bg={'#1d1d1d'}
    w={'100%'}
    h={'50px'}
    borderTop={'1px solid #b2b2b2'}
    >
        <Flex gap={50} justifyContent={'center'} alignItems={'center'} p={'10px'} >
          <Link to={'/home'}>
            <IoIosHome size={25} color='white'/>
          </Link>
          <Link to={'/search'}>  
            <MdPersonSearch size={25} color='white'/>
          </Link>
          <Link to={'/'}>
            <FaRegPlusSquare size={25} color='white'/>
          </Link>
          <Link to={'/follow'}>
            <PiHeartStraight size={25} color='white'/>
          </Link>
          <Link to={'/myprofile'}>
            <CgProfile size={25} color='white'/>
          </Link>
        </Flex>

    </Box>
  )
}
