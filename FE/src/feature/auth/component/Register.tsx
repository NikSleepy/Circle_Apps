import { Box, Flex, Text, Link, Button } from '@chakra-ui/react';
import { InputDataProfile } from '../../../components/InputDataProfile';
// import { BiArrowBack } from 'react-icons/bi';
import { useRegister } from '../hooks/useRegister';

export const Register = () => {


  const { handleChange, handleSubmit } = useRegister();

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

          <form
            // onSubmit={formik.handleSubmit}
            onSubmit={handleSubmit}
          >
            <InputDataProfile
              name="username"
              type="text"
              placeholder="username"
              //  onChange={formik.handleChange}
              onChange={handleChange}
            />

            <InputDataProfile
              name="fullName"
              type="text"
              placeholder="Full Name"
              //  onChange={formik.handleChange}
              onChange={handleChange}
            />

            <InputDataProfile
              name="email"
              type="email"
              placeholder="Email"
              // onChange={formik.handleChange}
              onChange={handleChange}
            />

            <InputDataProfile
              name="password"
              type="password"
              placeholder="password"
              //  onChange={formik.handleChange}
              onChange={handleChange}
            />

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
            <Link href={'/login'}>
              {' '}
              <Text color="#04a51e"> Login</Text>{' '}
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
