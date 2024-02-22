import { Box, Button, Flex, Grid, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg'
import { IoIosHome } from 'react-icons/io'
import { IoLogInOutline } from 'react-icons/io5'
import { MdPersonSearch } from 'react-icons/md'
import { PiHeartStraight } from 'react-icons/pi'
import { TbLogout2 } from 'react-icons/tb'
import { CreatePost } from '../elements/CreatePost'
import { Link } from 'react-router-dom'
// templateAreas={`"top" "buttom`} gridTemplateRows={`'80%' '20%'`}

export const NavHome = () => {
const { isOpen,onOpen, onClose } = useDisclosure()

const token = sessionStorage.getItem('token')
// const user = window.localStorage.getItem('user')


const logout = () => {
    sessionStorage.removeItem('token')
    

}



  return (
        <Grid p={5} h={'100vh'} w={'100%'}  >
            
            <Box h={'100vh'} position={'fixed'} >
                
                <Text fontSize={'5xl'} fontWeight={'bold'} color='#04a51e' mb={'20px'}>circle</Text>
                
                <Link to={'/'} >
                    <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>

                     <IoIosHome size={25} color='white'/>
                     <Text  >Home</Text>
                    </Flex>

                </Link>

                <Link to={'/search'} >
                    <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>

                    <MdPersonSearch size={25} color='white'/> 
                     <Text  >Search</Text>
                    </Flex>

                </Link>

                <Link to={'/follow'} >
                    <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>

                    <PiHeartStraight size={25} color='white'/>
                     <Text  >Follows</Text>
                    </Flex>

                </Link>

                <Link to={'/search'} >
                    <Flex fontSize={'lg'} display={'flex'} gap={3} my={2}>

                    <CgProfile size={25} color='white'/>
                     <Text  >Profile</Text>
                    </Flex>

                </Link>
                    
                

                <Button
                    bg={'#04a51e'}
                    color={'white'}
                    w={'100%'}
                    borderRadius={'20px'}
                    my={6}
                    p={3}
                    _hover={{ color: 'black', background:'white'}}
                    onClick={onOpen}
                    >
                    Create Post
                </Button>

                <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'xl'} >
                    <ModalOverlay />
                    <ModalContent bg={'#1d1d1d'} color={'white'} >
                        <ModalHeader>Created Post</ModalHeader>
                        <ModalBody   >
                            <CreatePost />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='none' mr={3} onClick={onClose}>
                            Close
                            </Button>
                            {/* <Button colorScheme='none'>Post</Button> */}
                        </ModalFooter>
                    </ModalContent>
                </Modal>


                <Box display={'flex'} h={'50px'} alignItems={'end'} mt={200}  >
                { token ? 
                            <Link to='/login'  onClick={logout}>
                                <Flex display={'flex'}  gap={3} paddingBottom={'20px'}>
                                 <TbLogout2 size={'30px'} />   
                                 <Text fontSize={'lg'}>Logout</Text>
                                </Flex>
                             </Link>
                             :
                             <Link to='/login'  >
                                <Flex display={'flex'}  gap={3} paddingBottom={'20px'}>
                                    <IoLogInOutline size={'30px'} />   
                                    <Text fontSize={'lg'}>Login</Text>
                                </Flex>
                            </Link>
                }
                
                </Box>

            </Box>
           

            

            
        </Grid>
        
     
    
  )
}
