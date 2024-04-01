import { useDispatch } from 'react-redux'
import { api } from '../../../assets/libs/api'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../../store/type'
import { dataThreads } from '../../../store/slice'

export const useThreadLikes = () => {



    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()

 
   
 
    const token = sessionStorage.getItem('token')

    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    const handleLikes =  async (id: number) => {
        try{
            const data = {
                thread:id
            }
            const response = await api.post('/thread/like',data, config)
            console.log(response.data)
            dispatch(dataThreads())

        } catch (error){
            console.log("error in post like",error)
        }
    }
    
  return {
    handleLikes
  }
}
