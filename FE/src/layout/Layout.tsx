import { Box } from '@chakra-ui/react';
import { NavbarHpTop } from '../components/NavbarHpTop';
import { NavbarHp } from '../components/NavbarHpButtom';
import { NavHome } from './component/NavHome';
import { RightSideBar } from './component/RightSideBar';
// import { Outlet } from 'react-router-dom'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box color={'white'} h={'100vh'}>
      <Box
        display={{
          base: 'circle',
          sm: 'circle',
          md: 'none',
          lg: 'none',
          xl: 'none',
        }}
        w={'full'}
        zIndex={9999}
      >
        <NavbarHpTop />
      </Box>

      <Box display={'flex'}>
        <Box
          w={'30vw'}
          display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
          h={'100vh'}
        >
          <NavHome />
        </Box>

        <Box w={'100vw'} borderX={'1px solid #b2b2b2'}>{children}</Box>

        <Box
          display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
          w={'40vw'}
          h={'auto'}
          
        >
          <RightSideBar />
        </Box>
      </Box>

      <Box
        display={{ base: 'circle', sm: 'circle', md: 'none', lg: 'none' }}
        position={'fixed'}
        w={'full'}
        zIndex={9999}
        bottom={0}
      >
        <NavbarHp />
      </Box>
    </Box>
  );
};
