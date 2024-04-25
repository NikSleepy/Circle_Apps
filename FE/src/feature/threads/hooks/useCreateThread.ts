import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { API } from "../../../libs/api"
import { useDispatch } from "react-redux"
import { dataThreads } from "../../../store/slice"
import { Action, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../../../store/type"



interface ITypes {
    content: string,
    image_thread: File | null
}

export const useCreateThread = () => {
    const toast = useToast()
    const [ data, setData ] = useState<ITypes>({
        content:"",
        image_thread:null
    })
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()
    

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, content: e.target.value}))
    }

    const handleChangeFile = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, image_thread: e.target.files![0]}))
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('/thread/post', data).catch(()=> handleSubmit(e))

            dispatch(dataThreads())
            toast({
                title:'success upload thread',
                status:'success',
                duration:2000,
                position:'top'
            })
            
        } catch (error) {
            toast({
                title:`eror in post ${error}`,
                status:'error',
                duration:4000,
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