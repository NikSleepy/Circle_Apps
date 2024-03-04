
import  { useState } from 'react'
import { api } from '../../../assets/libs/api'
// import { useDispatch } from 'react-redux'
// import { STATE_USERALL } from '../../../store/rootReducer'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../../store/type'

interface Followers {
    id:number
    fullName:string
    username:string
    photo:string
    followings:boolean

  }

export const useGetFollowings = () => {
    const [ followings, setFollowings ] = useState<Followers[]>([])
  //  console.log("bang",followings)
    // const user = useSelector((state:RootState) => state.follows)
    // const dispatch = useDispatch()
    const token = sessionStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const followers = async () => {
      try {
        const response = await api.get('/followings', config)
        setFollowings(response.data.data)
        // console.log("response di following",response.data.data)
        // dispatch(STATE_USERALL(response.data.data))
        
      } 
      catch (error) {
        console.log(error);
      }
    }
    // console.log(follows)




  return {
    followers,
    followings,
  
  }
}
