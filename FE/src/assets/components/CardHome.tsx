//code untuk extention buat sebuah function "rafc"

import { Box, Text } from '@chakra-ui/react'
import { CardPost } from '../elements/CardThread';
import { CreatePost } from '../elements/CreatePost';
import { useEffect, useState } from 'react';
// import { DataPost } from '../types/Type';
// import Dummy from '../datas/dummy.json'
import { api } from '../libs/api';


interface Thread {
    id:number,
    content:string,
    image_thread:string,
    created_at:string,
    numberOfReply:number,
    user:{
        id:number,
        username:string,
        fullName:string,
        photo_profile:string

    },
}

export const CardHome = () => {
    const [ post, setPost ] = useState<Thread[]>([])  

    const getPost = async () => {
        try {
            const response = await api.get('/thread')
            
            setPost(response.data.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    
    
    // function hitungPanjangArray<T>(arr: T[]): number {
        
    //     return arr.length;
    // }
    
    useEffect(()=>{
        getPost();
        
    },[])
  
    ;
    
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
        
        { post?.map(( data, index ) => {
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
                    
                    
                     />
                     
                     
                </Box>
            ) 
        })}
    
        </Box>
  )
}

