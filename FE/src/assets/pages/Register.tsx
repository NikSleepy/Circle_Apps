import { Box,  Flex,  Text, Link, Button } from '@chakra-ui/react'
import { InputDataProfile } from '../components/InputDataProfile'
import { BiArrowBack } from 'react-icons/bi'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Loggedin {
  username:string,
  fullName:string,
  email:string,
  password:string
}

export const Register = () => {
  const [ register, setRegister ] = useState<Loggedin>({
    username:"",
    fullName:"",
    email:"",
    password:""
})

  console.log(register)
  const navigate = useNavigate();



const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister(( prevLogin ) => ({ ...prevLogin, [name]:value }))
}

const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/v1/register', register)
        console.log("response",response)
        navigate('/login')
    } catch (error) {
      console.log("eror di posting register",error)
    }
}

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



                <form onSubmit={handleSubmit}>
                  <InputDataProfile name='username' type='text' placeholder='username' onChange={handleChange} value={register.username}/>
                  <InputDataProfile name='fullName' type='text' placeholder='Full Name' onChange={handleChange} value={register.fullName}/>
                  <InputDataProfile name='email' type='email' placeholder='Email' onChange={handleChange} value={register.email}/>
                  <InputDataProfile name='password' type='password' placeholder='password' onChange={handleChange} value={register.password}/>
                  <Button w={'100%'} borderRadius={'20px'} my={'10px'} bg={'#04a51e'} onClick={ handleSubmit} color={'white'}>Create</Button>
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