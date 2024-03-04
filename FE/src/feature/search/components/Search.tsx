import { Avatar, Box, Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/type'
import { CardUserFollow } from '../../../assets/atom/CardUserFollow'
import { useState } from 'react'

export const Search = () => {
  const [ state, setState ] = useState('')
  const follows = useSelector((state:RootState) => state.follows)

  const filter = state ? follows?.filter((data) => data.username.toLowerCase().includes(state.toLowerCase())): follows;

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }
  
  return (
    <Box
    
    w={'100%'}
    h={'100%'}
    
    >

          <Link to={'/'} >
            <Flex p={'10px'} gap={3} display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
                <BiArrowBack  size={30}/>
                <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
            </Flex>
          </Link>
        <Flex>
            <InputGroup m={'10px'} size={'lg'} gap={3}>
                <InputLeftElement pointerEvents='none' >
                    <Avatar src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg" size={'sm'} />
                </InputLeftElement>
                <Input type='text' placeholder='Search'  onChange={handleChange}/>
                <Button
                color={'revert-layer'}
                >Search</Button>
            </InputGroup>
        </Flex>


        {filter?.map((data) => (
          <CardUserFollow
          key={data.id}
          username={data.username}
          fullName={data.fullName}
          id={data.id}
          photo_profile={data.photo_profile}
          isFollow={data.isFollow}
          />
        ))}


    </Box>
  )
}
