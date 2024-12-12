import { Box, Flex, Text, Button, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { InputDataProfile } from '../../../components/InputDataProfile';
// import { BiArrowBack } from 'react-icons/bi';
import { useRegister } from '../hooks/useRegister';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Register = () => {
  const { handleChange, handleSubmit } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box bg={'#1d1d1d'} color={'white'} h={'100vh'}>
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
          <Text color={'#04a51e'} fontSize={'4xl'} fontWeight={'bold'}>
            Circle
          </Text>
          <Text fontSize={'lg'} mb={'10px'}>
            Create Akun Circle
          </Text>

          <form onSubmit={handleSubmit}>
            <InputDataProfile
              name="username"
              type="text"
              placeholder="username"
              bg={'#1D1D1D'}
              isRequired
              onChange={handleChange}
            />

            <InputDataProfile
              name="fullName"
              type="text"
              placeholder="Full Name"
              bg={'#1D1D1D'}
              isRequired
              onChange={handleChange}
            />

            <InputDataProfile
              name="email"
              type="email"
              placeholder="Email"
              bg={'#1D1D1D'}
              isRequired
              onChange={handleChange}
            />

            <InputGroup>
              <InputDataProfile
                name="password"
                type={showPassword ? 'text' : 'password'} // Toggle type here
                placeholder="password"
                bg={'#1D1D1D'}
                h={'40px'}
                onChange={handleChange}
              />
              <InputRightElement
                display={'flex'}
                alignItems={'center'}
                h={'full'}
              >
                <IconButton
                  variant=""
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={
                    showPassword ? (
                      <FaRegEye color="#04a51e" />
                    ) : (
                      <FaRegEyeSlash color="#04a51e" />
                    )
                  }
                  onClick={togglePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              w={'100%'}
              borderRadius={'20px'}
              my={'10px'}
              bg={'#04a51e'}
              type="submit"
              color={'white'}
            >
              Create
            </Button>
          </form>

          <Flex gap={2}>
            <Text>Don't have a account ?</Text>
            <Link to={'/login'}>
              {' '}
              <Text color="#04a51e"> Login</Text>{' '}
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
