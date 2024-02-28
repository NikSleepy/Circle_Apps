import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../../assets/libs/api"

interface ITypes {
    thread:number,
    content:string,
    file_reply: File | null
}

export const useReply = () => {
    const { id } = useParams();
    const token = sessionStorage.getItem('token');
    const toast = useToast();
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }

    const [ data, setData ] = useState<ITypes>({
        thread: Number(id),
        content:"",
        file_reply: null
    })

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        
        setData((prev) => ({ ...prev, content: e.target.value }))
    }

    const handleChangeFile = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, iamge: e.target.files![0]}))
    }

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        try {
            await api.post('/reply/post', data, config)
            // console.log(data)

            toast({
                title:`success upload reply `,
                duration:2000,
                position:'top',
                status:'success'
            })


        } catch (error) {
            toast({
                title:`error post reply because ${error}`,
                duration:4000,
                status:'error',
                position:'top'
            })
        }
    }

    return {
        handleChange,
        handleChangeFile,
        handleSubmit
    }
}