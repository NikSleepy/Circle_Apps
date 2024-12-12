import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../libs/api"
import { useDispatch } from "react-redux"
import { STATE_THREAD_BY_ID } from "../../../store/rootReducer"
import { AxiosError } from "axios"


interface ITypes {
    thread:number,
    content:string,
    file_reply: File | null
}

export const useReply = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const toast = useToast();
    const navigate = useNavigate();


    const [ data, setData ] = useState<ITypes>({
        thread: Number(id),
        content:"",
        file_reply: null
    })
    // const dispatch = useDispatch()

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        
        setData((prev) => ({ ...prev, content: e.target.value }))
    }

    const handleChangeFile = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, iamge: e.target.files![0]}))
    }

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        try {
             await Api.post('/reply/post', data).then(()=> {
                toast({
                    title:`success upload reply `,
                    duration:2000,
                    position:'top',
                    status:'success'
                })
             })
             .catch(()=>{
                toast({
                    title:`error upload reply `,
                    duration:2000,
                    position:'top',
                    status:'error'
                })
             })
            


            setData({
                thread: Number(id),
                content: "",
                file_reply: null
            });
            
            getThreadById();

        } catch (error) {
            toast({
                title:`error post reply because ${error}`,
                duration:4000,
                status:'error',
                position:'top'
            })
        }
    }

    const getThreadById = async () => {
        try {
            const response = await Api.get(`/thread/${id}`)
            dispatch(STATE_THREAD_BY_ID(response.data.data))
            
        } catch (error) {
            const axiosError = error as AxiosError;
            if(axiosError.response?.status === 401) {
                navigate('/login')
            }
        }
    }

    return {
        handleChange,
        handleChangeFile,
        handleSubmit,
        getThreadById
    }
}