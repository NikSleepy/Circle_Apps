import { Box,  Flex,  Text, Link, Button } from '@chakra-ui/react'
import { InputDataProfile } from '../elements/InputDataProfile'
import { BiArrowBack } from 'react-icons/bi'
// import { useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { api } from '../libs/api'

// interface Loggedin {
//   username:string,
//   fullName:string,
//   email:string,
//   password:string
// }

export const Register = () => {
//   const [ register, setRegister ] = useState<Loggedin>({
//     username:"",
//     fullName:"",
//     email:"",
//     password:""
// })

  // console.log(register)
  
  
  
  // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
//     setRegister(( prevLogin ) => ({ ...prevLogin, [name]:value }))
// }

// const handleSubmit = async (e:React.FormEvent) => {
  //     e.preventDefault();
  //     try {
    //         const response = await axios.post('http://localhost:5000/api/v1/register', register)
    //         console.log("response",response)
    //         navigate('/login')
    //     } catch (error) {
      //       console.log("eror di posting register",error)
      //     }
      // }
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        username: '',
        fullName: '',
        email: '',
        password: ''
      }, onSubmit: async () => {
        try {
          const response = await api.post('/register', formik.values)
          // console.log('response', response.data)
          
          if (response.data.data){
            navigate('/login')
          } else {
            alert(`${response.data}`)
          }
        } catch (error) {
          console.log('error', error)
        }
      } 
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
        h={'80vh'}
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
                    Create Akun Circle
                </Text>



                <form onSubmit={formik.handleSubmit}>
                  <InputDataProfile name='username' type='text' placeholder='username' onChange={formik.handleChange}/>
                  <InputDataProfile name='fullName' type='text' placeholder='Full Name' onChange={formik.handleChange} />
                  <InputDataProfile name='email' type='email' placeholder='Email' onChange={formik.handleChange} />
                  <InputDataProfile name='password' type='password' placeholder='password' onChange={formik.handleChange} />
                  <Button w={'100%'} borderRadius={'20px'} my={'10px'} bg={'#04a51e'} type='submit' color={'white'}>Create</Button>
                </form>

                <Flex gap={2} >
                <Text>Don't have a account ?</Text>
                <Link href={'/login'} > <Text color='#04a51e'> Login</Text> </Link>
                </Flex>
            </Box>
        </Box>
    </Box>
  )
  }