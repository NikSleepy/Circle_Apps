import { useEffect, useState } from "react"
import { api } from "../../../assets/libs/api"

interface Followers {
    id:number
    fullName:string
    username:string
    photo_profile:string
    isFollow:boolean

  }
export const useGetFollows = () => {
    const [ follows, setFollows ] = useState<Followers[]>([])

    const token = sessionStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const followers = async () => {
      try {
        const response = await api.get('/users', config)
        setFollows(response.data.data)
        // console.log(response.data.data)
        
      } 
      catch (error) {
        console.log(error);
      }
    }
    // console.log(follows)

    useEffect(() => {
        followers()
    },[])

    return {

        follows,
        followers
    }
}