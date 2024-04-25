
import { Api } from '../../../libs/api'
import { useDispatch } from 'react-redux'
import { STATE_FOLLOW } from '../../../store/rootReducer'
import { useEffect } from 'react'


export const useGetFollowings = () => {

    const dispatch = useDispatch()


    const followers = async () => {
      try {
        const response = await Api.get('/followings')

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
