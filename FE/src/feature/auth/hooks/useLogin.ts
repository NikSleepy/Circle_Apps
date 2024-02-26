import { useState } from "react"
import { api } from "../../../assets/libs/api"
import {  useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
// interface propsLogin { username:string, password:string }
export const useLogin = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [ data, setData ] = useState({
        username:"",
        password:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prevFile) => ({
            ...prevFile,
            [name]: value
        }))
    }

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault()
        try {
            const response =  await api.post("/login", data).then(res => {return res.data}).catch(function (error) {
                toast({
                    title: `${error.response.data.error} please check again`,
                    status: 'error',
                    duration: 2000,
                    position: 'top',
                })
            })

            sessionStorage.setItem('token', response.token)

            if ( sessionStorage.getItem('token')) {
                navigate('/')
            }

            toast({
                title: 'Login Success',
                description: "welcome bro",
                status: 'success',
                duration:4000,
                isClosable: true,
                position: 'top',
            
            })

        } catch (error) {
            console.log(error)
        }
    } 

    return {
        
        handleChange,
        handleSubmit
    }
}