
import { api } from '../../../libs/api'
import { useDispatch } from 'react-redux'
import { STATE_FOLLOW } from '../../../store/rootReducer'
import { useEffect } from 'react'


export const useGetFollowings = () => {

    const dispatch = useDispatch()
    const token = sessionStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const followers = async () => {
      try {
        const response = await api.get('/followings', config)
        // setFollowings(response.data.data)
        // console.log("response di following",response.data.data)
        dispatch(STATE_FOLLOW(response.data.data))
        
      } 
      catch (error) {
        console.log(error);
      }
    }
    // console.log(follows)


    useEffect(()=> {
      followers()
    },[])

  return {
    followers,
  }
}
