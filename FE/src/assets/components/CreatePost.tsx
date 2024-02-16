import { Avatar, Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { SlPicture } from 'react-icons/sl'
// import { api } from '../libs/api'

export const CreatePost = ( ) => {
  
  const user = localStorage.getItem('user')

  const formik = useFormik({
    initialValues: {
      content:"",
      image:"",
      user:user
    }, onSubmit: async () => {
      try {
        const fromData = new FormData();
        fromData.append('image', formik.values.image);
        
        // fromData.append('content', formik.values.content);
        // await api.post('/thread/post', formik.values)

        console.log(formik.values.image);

      } catch (error) {
        console.log(error);
        
      }
    }
  });

  



  
  
  

  return (
    <form onSubmit={formik.handleSubmit} >         
      <Flex 
          p={'3vh'}  
          gap={'2vh'} 
          w={'100%'}>
          <Avatar
              src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg"/>
          <Input 
          name='content' 
          type="text" 
          placeholder="What is Happening!? " 
          border={'none'} 
          onChange={formik.handleChange} 
          value={formik.values.content}></Input>

          <FormLabel htmlFor="image">
              <SlPicture size={38} color="#005e0e"/>
          </FormLabel>
          <Input 
          type="file" 
          id="image"
          name='image' 
          onChange={(e) => { formik.setFieldValue('image', e.target.files![0]) }} 
          // value={formik.values.image}
          accept='image/jpg, image/jpeg, image/png'
          hidden/>  
          <Button bg={'#005e0e'} type='submit'>Post</Button>
      </Flex>
    </form>
  )
}
