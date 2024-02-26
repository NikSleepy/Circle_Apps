import { Avatar, Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { SlPicture } from 'react-icons/sl'
import { useParams } from 'react-router-dom'
import { api } from '../libs/api'
interface PostReplysProps {
    thread: number,
    content: string,
    image: File | null,
}
export const PostReplys = () => {
    const {id} = useParams()
    
    const [ post, setPost ] = React.useState<PostReplysProps>({
        thread: Number(id),
        content: '',
        image: null,
    })

    
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setPost(( prevPost ) => ({ ...prevPost, [name]:value }))
    // }

    const auth = sessionStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
         await api.post('/reply/post', post, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        // console.log(response);

        } catch ( error ) {
            console.log(error);
        }
    }

    
  return (
    <form onSubmit={handleSubmit} >         
    <Flex 
        p={'3vh'}  
        gap={'2vh'} 
        w={'100%'}
        borderBottom={'1px solid #b2b2b2'}>
        <Avatar
            src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg"/>
        <Input 
        name='content' 
        type="text" 
        placeholder="What is Happening!? " 
        border={'none'} 
        // onChange={handleChange}
        // value={post.content}
        onChange={(e) => { setPost((data)=> ({ ...data, content: e.target.value })) }}
        ></Input>

        <FormLabel htmlFor="image">
            <SlPicture size={38} color="#005e0e"/>
        </FormLabel>
        <Input 
        type="file" 
        id="image"
        name='image' 
        // onChange={handleChange}
        // value={post.image}
        // onChange={(e) => { formik.setFieldValue('image', e.target.files![0]) }} 
        onChange={(e) => { setPost((data)=> ({ ...data, image: e.target.files![0] })) }}
        accept='image/jpg, image/jpeg, image/png'
        hidden/>  
        <Button bg={'#005e0e'} type='submit'>Post</Button>
    </Flex>
  </form>
  )
}
