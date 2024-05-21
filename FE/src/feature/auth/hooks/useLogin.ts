import { useState } from "react"
import { api } from "../../../libs/api"
import {  useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"


export const useLogin = () => {
    // const navigate = useNavigate()
    const toast = useToast()
    const [ data, setData ] = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate();

    

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

            // window.location.href = '/home'
            navigate('/home')

           

        } catch (error) {
            console.log(error)
        }
    } 

    return {
        
        handleChange,
        handleSubmit
    }
}