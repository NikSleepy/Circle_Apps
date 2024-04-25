import { Avatar, Button, Flex, FormLabel, Input } from '@chakra-ui/react'

import { SlPicture } from 'react-icons/sl'
import { useCreateThread } from '../hooks/useCreateThread'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/type'


export const CreatePost = ( ) => {
  
  //================= use formik ======================
  // const token = sessionStorage.getItem('token')
  // const config = {
  //   headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
  // }

  // const formik = useFormik({
  //   initialValues: {
  //     content:"",
  //     image:"",
      
  //   }, onSubmit: async () => {
  //     try {
        
  //       await api.post('/thread/post', formik.values, config)
        
        
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }
  // });

  

  const { handleChange, handleSubmit, handleChangeFile } = useCreateThread()
  const user = useSelector((state: RootState) => state.user.data)

  return (
    <form 
    // onSubmit={handleSubmit}
    onSubmit={handleSubmit}
     >         
      <Flex 
          p={'3vh'}  
          gap={'2vh'} 
          w={'100%'}>
          <Avatar
              src={`${user.photo_profile}`}/>
          <Input 
          name='content' 
          type="text" 
          placeholder="What is Happening!? " 
          border={'none'} 
          // onChange={formik.handleChange} 
          // value={formik.values.content}
          // onChange={(e)=> setFile((prevFile)=>({...prevFile, content: e.target.value}))} 
          onChange={handleChange}
          ></Input>

          <FormLabel htmlFor="image">
              <SlPicture size={38} color="#005e0e"/>
          </FormLabel>
          <Input 
          type="file" 
          id="image"
          name='image' 
          // onChange={(e) => { formik.setFieldValue('image', e.target.files![0]) }} 
          // onChange={(e)=> setFile((prevFile)=>({...prevFile, image_thread: e.target.files![0]}))}
          onChange={handleChangeFile}
          accept='image/jpg, image/jpeg, image/png'
          hidden/>  
          <Button bg={'#005e0e'} type='submit'>Post</Button>
      </Flex>
    </form>
  )
}
