import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../../libs/api"
import { useToast } from "@chakra-ui/react"


export const useRegister = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [ data, setData ] = useState({
        username:"",
        fullName:"",
        email:"",
        password:""
    })


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]:value}))
    }

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();

        try {
            const response = await api.post('/register', data)
            toast({
                title:`${response.data.message}`,
                status:'success',
                duration:2000,
                position:'top'
            })
            navigate('/login')

        } catch (error) {
            alert(`eror nih di register ${error}`)
            toast({
                title:`${error}`,
                status:'error',
                duration:2000,
                position:'top'
            })
        }
    }

    return {
        handleChange,
        handleSubmit
    }
}