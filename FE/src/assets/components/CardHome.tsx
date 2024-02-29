//code untuk extention buat sebuah function "rafc"

import { Box, Text } from '@chakra-ui/react'
import { CardPost } from '../atom/CardThread';
import { CreatePost } from '../atom/CreatePost';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';
import { useEffect } from 'react';
import { useFecthThread } from '../../feature/threads/hooks/useFecthThread';



export const CardHome = () => {

    // const [ post, setPost ] = useState<Thread[]>([]) 
    // console.log(`first`, threads)
    // const dispatch = useDispatch()
    // const config = {
        //     headers: { Authorization: `Bearer ${sessionStorage.getItem('token')} `}
    // }
    // const getPost = async () => {
        //     try {
            //         const response = await api.get('/thread',config)
    //         dispatch(STATE_THREAD(response.data.data))
    //         // setPost(response.data.data)
    //         // console.log("ini dari card home",response.data.data);
    
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // console.log(threads)
    
    
    
    // function hitungPanjangArray<T>(arr: T[]): number {
        
        //     return arr.length;
        // }
    const { getPost} = useFecthThread()
    const threads = useSelector((state:RootState) => state.thread)
  
    
    useEffect(()=>{
        getPost();
    },[getPost])
  return (
        <Box
        // w={{ base:'100%', md:'100%', lg:'700px'}}
        h={'100%'}
        
        >
            <Text 
                    display={{base:'none', sm:'none', md:'block',lg:'block', xl:'block'}}
                    fontSize={'2xl'} 
                    fontWeight={'bold'} 
                    mx={'15px'}
                    pt={'4vh'}>
                        Home
            </Text>   


            <Box
            
            borderBottom={'1px solid #b2b2b2'}
            display={{base:'none', sm:'none', md:'block',lg:'block', xl:'block'}}
            
            >
                <CreatePost />
            </Box>


        {/* bagian card */}

        
        { threads?.map(( data, index ) => {
            return(
                <Box key={index}>
                    <CardPost 
                    id={data?.id}
                    content={data?.content}
                    image_thread={data?.image_thread}
                    created_at={data?.created_at}
                    user={data?.user?.id}
                    username={data?.user?.username}
                    fullName={data?.user?.fullName}
                    photo_profile={data?.user?.photo_profile}
                    reply={data?.numberOfReply}
                    likes={data?.likes}
                     />
                     
                     
                </Box>
            ) 
        })}
    
        </Box>
  )
}

