import { Box, Button, Flex, Link, Text,  } from '@chakra-ui/react'
import { InputDataProfile } from '../../../components/InputDataProfile'
import { BiArrowBack } from 'react-icons/bi'
import { useLogin } from '../hooks/useLogin'

export const Login = () => {
  

    const { handleChange, handleSubmit } = useLogin();


  return (
    <Box 
    bg={'#1d1d1d'}
    color={'white'}
    h={'100vh'}
    
    >


        <Flex p={'10px'}>
            <Link href={'/'} display={'flex'} gap={3}>
                <BiArrowBack  size={30}/>
                <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
            </Link>
        </Flex>

        <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        >
            

            <Box
            w={'345px'}
            h={'auto'}
            bg={'#262626'}
            borderRadius={'20px'}
            p={'30px'}
            color={'white'}
            
            >
                <Text 
                color={'#04a51e'}
                fontSize={'4xl'}
                fontWeight={'bold'}>
                    Circle
                </Text>
                <Text fontSize={'lg'} mb={'10px'}>
                    Login Akun  Circle
                </Text>



                <form 
                // onSubmit={formik.handleSubmit}
                onSubmit={handleSubmit}
                >
                <InputDataProfile name='username' type='text' placeholder='username' 
                // onChange={formik.handleChange}
                onChange={handleChange}
                 />
                <InputDataProfile name='password' type='password' placeholder='password' 
                // onChange={formik.handleChange}
                onChange={handleChange}
                 />
                <Button w={'100%'} borderRadius={'20px'} my={'10px'} bg={'#04a51e'} type='submit'  >Login</Button>
                </form>

                <Flex gap={2} >
                <Text>Don't have a account ?</Text>
                <Link href={'/register'} > <Text color='#04a51e'> register</Text> </Link>
                </Flex>
            </Box>
        </Box>
    </Box>
  )
}
