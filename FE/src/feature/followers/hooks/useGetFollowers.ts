import { useDispatch } from 'react-redux'
import { api } from '../../../assets/libs/api'
import { STATE_FOLLOWERS } from '../../../store/rootReducer'
import { useEffect } from 'react'


export const useGetFollowers = () => {
    const dispatch = useDispatch()
    const token = sessionStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const handleGet = async () => {
        try {
            
            const response = await api.get('/followers',config)
            // setFollowers(response.data.data)
            dispatch(STATE_FOLLOWERS(response.data.data))
            // console.log('folowers', followers)
        } catch (error) {
            console.log("eror get followers")
        }

    }

    useEffect(()=> {
      handleGet()
    }, [])

  return {
    handleGet
  }
}
