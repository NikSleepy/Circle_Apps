import { useToast } from "@chakra-ui/react"
import { api } from "../../../assets/libs/api";
import { useGetFollows } from "./useGetFollows";

// import axios from "axios";


export const usePostFollows = () => {

    const toast = useToast();

  
    const { followers } = useGetFollows()
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // }
    // console.log('token nih bang',token )
    
    const handleSubmit = async(id:number) => {
        try{
            const response = await api.post(`/user/following/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            followers()

            toast({
                title:`${response.data.message}`,
                duration:2000,
                status:'success',
                position:'top'
            })
            
        } catch (error) {
            toast({
                title:'gagal follow nih bang',
                duration:2000,
                status:'error',
                position:'top'
            })
        }
    }

    return {
        
        handleSubmit
    }
}