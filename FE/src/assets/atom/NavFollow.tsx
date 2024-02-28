import { Box, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { CardUserFollow } from './CardUserFollow'
import { useGetFollows } from '../../feature/follows/hooks/useGetFollows'


export const NavFollow = () => {
  const { follows } = useGetFollows()
  // console.log( follows)
  return (
    <Box 
    w={'100%'}
    display={{ base: 'none',sm: 'none' , md:'block', lg:'block', xl:'block'}}
    >   
          <Link to={'/'} >
            <Flex p={'10px'} gap={3}  display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
                    <BiArrowBack  size={30}/>
                    <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
            </Flex>
          </Link>
        
   
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
                {follows?.map((items)=> (
                  <CardUserFollow
                  username={items?.username}
                  fullName={items?.fullName}
                  id={items.id}
                  photo_profile={items.photo_profile}
                  isFollow={items.isFollow}
                  />
                ))}
                
              </TabPanel>
              <TabPanel>
              {follows?.map((items)=> (
                  <CardUserFollow
                  username={items?.username}
                  fullName={items?.fullName}
                  id={items.id}
                  photo_profile={items.photo_profile}
                  isFollow={items.isFollow}
                  />
                ))}
              </TabPanel>
            </TabPanels>

          </Tabs>

        
    </Box>
  )
}
