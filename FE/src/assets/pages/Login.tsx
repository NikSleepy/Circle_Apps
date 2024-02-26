import { Box, Button, Flex, Link, Text, useToast  } from '@chakra-ui/react'
import { InputDataProfile } from '../elements/InputDataProfile'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { api } from '../libs/api'

export const Login = () => {
  
    const navigate = useNavigate();
    const toast = useToast();

    const formik = useFormik({ 
        initialValues: {
            username:"",
            password:""
        }, onSubmit: async () => {
            
            try {
                const response = await api.post('/login', formik.values).then(res => {return res.data}).catch(function (error) {
                    // console.log(error.response.data);
                    toast({
                        title: `${error.response.data.error} please check again`,
                        status: 'error',
                        duration: 2000,
                        position: 'top',
                    })
                  });
                
                
                // console.log(response.token);
                sessionStorage.setItem('token', response.token)
                localStorage.setItem('user', response.user)
                // const token = sessionStorage.getItem('token')
                const token = sessionStorage.getItem('token')
                //   console.log(token);
                  

                toast({
                    title: 'Login Success',
                    description: "welcome bro",
                    status: 'success',
                    duration:4000,
                    isClosable: true,
                    position: 'top',

                })
                
            
                
                
                
                if (token ){
                    navigate('/')
                }
              
                
            } catch ( error ) {
                console.log(error)
            }
            

        },
    })





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
                onSubmit={formik.handleSubmit}
                >
                <InputDataProfile name='username' type='text' placeholder='username' 
                onChange={formik.handleChange}
                 />
                <InputDataProfile name='password' type='password' placeholder='password' 
                onChange={formik.handleChange}
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
