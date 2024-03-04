import  { useEffect, useState } from 'react'
import { IFollowers } from '../../../assets/types/Type'
import { api } from '../../../assets/libs/api'

export const useGetFollowers = () => {
    const [ followers, setFollowers ] = useState<IFollowers[]>([])

    const token = sessionStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const handleGet = async () => {
        try {
            
            const response = await api.get('/followers',config)
            setFollowers(response.data.data)
            console.log('folowers', followers)
        } catch (error) {
            console.log("eror get followers")
        }

    }
    useEffect(() => {
        handleGet
    },[])
  return {
    followers,
    handleGet

  }
}
