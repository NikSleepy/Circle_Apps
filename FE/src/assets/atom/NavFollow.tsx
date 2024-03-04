import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Followings } from './Followings'
import { Followers } from './Followers'


export const NavFollow = () => {
  // const { follows } = useGetFollows()
  // console.log( follows)
  return (
    <Box 
    w={'100%'}
    display={{ base: 'none',sm: 'none' , md:'block', lg:'block', xl:'block'}}
    >   

          <Tabs variant={'unStyled'} align='center'  isFitted >
            <TabList>
              <Tab>Followings</Tab>
              <Tab>Followers</Tab>
            </TabList>
            <TabIndicator
            h={'2px'}
            bg={'#00b7f4'}/>
            <TabPanels>
              <TabPanel>

                <Followings/>
                
              </TabPanel>
              <TabPanel>

                <Followers/>

              </TabPanel>
            </TabPanels>

          </Tabs>

        
    </Box>
  )
}
