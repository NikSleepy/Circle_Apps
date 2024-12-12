import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Followings } from '../../followings/component/Followings';
import { Followers } from '../../followers/component/Followers';
import { useThreadUser } from '../hooks/useThreadUser';
import { ThreadUser } from './ThreadUser';

export const ContentDetail = () => {
  const { threadUser } = useThreadUser();

  React.useEffect(() => {
    threadUser();
  }, []);

  return (
    <Box
      w={'100%'}
      display={{
        base: 'none',
        sm: 'block',
        md: 'block',
        lg: 'block',
        xl: 'block',
      }}
    >
      <Tabs variant={'unStyled'} align="center" isFitted>
        <TabList>
          <Tab>Thread</Tab>
          <Tab>Followings</Tab>
          <Tab>Followers</Tab>
        </TabList>
        <TabIndicator w={'50%'} h={'2px'} bg={'#00b7f4'} />
        <TabPanels>
          <TabPanel>
            <ThreadUser />
          </TabPanel>
          <TabPanel>
            <Followings />
          </TabPanel>
          <TabPanel>
            <Followers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
