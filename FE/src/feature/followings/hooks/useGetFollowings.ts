
// import { Api } from '../../../libs/api'
import { useDispatch } from 'react-redux'
import { STATE_FOLLOW } from '../../../store/rootReducer'
import { useEffect } from 'react'
import { api } from '../../../libs/api'


export const useGetFollowings = () => {

    const dispatch = useDispatch()

    const token = sessionStorage.getItem('token')


    const followers = async () => {
      try {
        const response = await api.get('/followings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        dispatch(STATE_FOLLOW(response.data.data))
        
      } 
      catch (error) {
        console.log(error);
      }
    }


    useEffect(()=> {
      followers()
    },[])

  return {
    followers,
  }
}
