import { Avatar, Box, Button, FormLabel, Image, Input, InputAddon, InputGroup, Textarea } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/type'
import { FaPenSquare } from 'react-icons/fa'
import { useEditUser } from '../hooks/useEditUser'


export const EditUser = () => {
    const { editUser, setData, setProfile } = useEditUser()
    const user = useSelector((state: RootState) => state.user.data)

    const submit = () => {
        editUser()
    }


  return (

    <Box justifyContent={'center'} alignItems={'center'} p={6}>
        <form>
        <Image src={user?.photo_cover ? user.photo_cover : "/image/BGCARD.jpeg" } rounded={8} w={'full'} h={'200px'}/>
        <Box display={'flex'} justifyContent={'center'}>
            <Avatar src={user?.photo_profile} w={'150px'} h={'150px'} rounded={'full'} mt={'-80px'} border={'3px solid #1D1D1D'}/>
            <FormLabel ml={'-20px'} mt={'20px'} htmlFor='photo' zIndex={999} >
                <FaPenSquare size={20}/>
            </FormLabel>
            <Input type='file' id='photo' name='photo' hidden onChange={(e)=> setProfile((prev)=>({...prev, photo_profile: e.target.files![0]}))}/>
        </Box>

        <Box textColor={'black'} mt={'10px'} marginTop={'20px'} >
            
                <InputGroup my={'6px'} >
                    <InputAddon>Username</InputAddon>
                    <Input color={'white'} placeholder={user.username} onChange={(e) => setData((prev)=> ({...prev, username: e.target.value}))}/>
                </InputGroup>

                <InputGroup my={'6px'} >
                    <InputAddon>FullName</InputAddon>
                    <Input color={'white'} placeholder={user.fullName} onChange={(e) => setData((prev)=> ({...prev, fullName: e.target.value}))}/>
                </InputGroup>

                <InputGroup my={'6px'} >
                    <Textarea color={'white'} placeholder='change your descriptions in here!!' onChange={(e) => setData((prev)=> ({...prev, description: e.target.value}))}/>
                </InputGroup>

                <Button mt={'20px'} onClick={submit}>Submit</Button>
            
        </Box>
        </form>
    </Box>

    )
}
