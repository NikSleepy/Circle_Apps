import { Avatar, Box, Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/type'
import { CardUserFollow } from '../../../components/CardUserFollow'
import { useEffect, useState } from 'react'
import { useGetAllUser } from '../hooks/useGetAllUser'

export const Search = () => {
  const user = useSelector((state:RootState)=> state.user.data)
  const [ state, setState ] = useState('')
  const {searchFollow } = useGetAllUser()
  const follows = useSelector((state:RootState) => state.userAll)

  const filter = state ? follows?.filter((data) => data.username.toLowerCase().includes(state.toLowerCase())): follows;
  // console.log(filter)
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  useEffect(()=> {
    searchFollow()
  },[])
  
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
                    <Avatar src={user?.photo_profile} size={'sm'} />
                </InputLeftElement>
                <Input type='text' placeholder='Search'  onChange={handleChange}/>
                <Button
                rounded={15}
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
