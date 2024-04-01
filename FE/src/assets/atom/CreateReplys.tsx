import { Avatar, Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import { SlPicture } from 'react-icons/sl'
import { useReply } from '../../feature/threads/hooks/useReply'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/type'

export const PostReplys = () => {

    const user = useSelector((state:RootState)=> state.user.data)

    const { handleChange, handleChangeFile, handleSubmit } = useReply();

    
  return (
    <form onSubmit={handleSubmit} >         
    <Flex 
        p={'3vh'}  
        gap={'2vh'} 
        w={'100%'}
        borderBottom={'1px solid #b2b2b2'}>
        <Avatar
            src={user.photo_profile}/>
        <Input 
        name='content' 
        type="text" 
        placeholder="What is Happening!? " 
        border={'none'} 
        onChange={handleChange}
        // value={post.content}
        // onChange={(e) => { setPost((data)=> ({ ...data, content: e.target.value })) }}
        ></Input>

        <FormLabel htmlFor="image">
            <SlPicture size={38} color="#005e0e"/>
        </FormLabel>
        <Input 
        type="file" 
        id="image"
        name='image' 
        onChange={handleChangeFile}
        // value={post.image}
        // onChange={(e) => { formik.setFieldValue('image', e.target.files![0]) }} 
        // onChange={(e) => { setPost((data)=> ({ ...data, image: e.target.files![0] })) }}
        accept='image/jpg, image/jpeg, image/png'
        hidden/>  
        <Button bg={'#005e0e'} type='submit'>Post</Button>
    </Flex>
  </form>
  )
}
