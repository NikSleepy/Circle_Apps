import { Avatar, Box, Flex,Menu,MenuButton,MenuItem,MenuList,Text } from '@chakra-ui/react'
import { IoSettingsOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { RootState } from '../store/type'
import {  useNavigate } from 'react-router-dom'
// import { TbLogout2 } from 'react-icons/tb'


export const NavbarHpTop = () => {
  const { data } = useSelector((state:RootState)=> state.user)
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <Box 
    bg={'#1d1d1d'}
    w={'100%'}
    borderBottom={'1px solid #b2b2b2'}
    >
        <Flex gap={[110,130,150]} justifyContent={'center'} alignItems={'center'} p={'10px'} borderBottom={'1px'} borderColor={'GrayText'}>
            <Avatar size={'md'} name='Dan Abrahmov' src={`${data.photo_profile}`} />
            <Text
            fontWeight={'bold'}
            fontSize={'2xl'}>
                Circle
            </Text>
            <Menu>
              <MenuButton>
                <IoSettingsOutline size={25} />
              </MenuButton>
              <MenuList >
                <MenuItem onClick={logout}>
                      <Text color={'black'}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
        </Flex>
        {/* <Flex gap={150} justifyContent={'center'} alignItems={'center'} p={'10px'}>
            <Text > For You </Text>
            <Text > Following </Text>
        </Flex> */}
    </Box>
  )
}
