import { Avatar, Box, Flex,Text } from '@chakra-ui/react'
import { IoSettingsOutline } from 'react-icons/io5'


export const NavbarHpTop = () => {
  return (
    <Box 
    bg={'#1d1d1d'}
    w={'100%'}
    
    borderBottom={'1px solid #b2b2b2'}
    >
        <Flex gap={[110,130,150]} justifyContent={'center'} alignItems={'center'} p={'10px'}>
            <Avatar size={'sm'} name='Dan Abrahmov' src='https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg' />
            <Text
            fontWeight={'bold'}
            fontSize={'2xl'}>
                Circle
            </Text>

            <IoSettingsOutline size={25} />
        </Flex>
        <Flex gap={150} justifyContent={'center'} alignItems={'center'} p={'10px'}>
            <Text > For You </Text>
            <Text > Following </Text>
        </Flex>
    </Box>
  )
}
