import { useDispatch } from 'react-redux'
// import { Api } from '../../../libs/api'
import { STATE_FOLLOWERS } from '../../../store/rootReducer'
import { useEffect } from 'react'
import { api } from '../../../libs/api'


export const useGetFollowers = () => {
    const dispatch = useDispatch()

    const token = sessionStorage.getItem('token');

    const handleGet = async () => {
        try {
            
            const response = await api.get('/followers', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            dispatch(STATE_FOLLOWERS(response.data.data))
            
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
