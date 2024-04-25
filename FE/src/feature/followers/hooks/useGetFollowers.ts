import { useDispatch } from 'react-redux'
import { Api } from '../../../libs/api'
import { STATE_FOLLOWERS } from '../../../store/rootReducer'
import { useEffect } from 'react'


export const useGetFollowers = () => {
    const dispatch = useDispatch()

    const handleGet = async () => {
        try {
            
            const response = await Api.get('/followers')
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
