import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Followings } from '../../feature/followings/component/Followings'
import { Followers } from '../../feature/followers/component/Followers'


export const  NavFollow = () => {
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
            w={'50%'}
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
