import { useDispatch } from 'react-redux'
import { Api, } from '../../../libs/api'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../../store/type'
import { dataThreads } from '../../../store/slice'
import { useThreadUser } from '../../DitailUser/hooks/useThreadUser'

export const useThreadLikes = () => {

    const { threadUser } = useThreadUser()
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()

    const handleLikes =  async (id: number) => {
        try{
            const data = {
                thread:id
            }
            await Api.post('/thread/like',data, )
            dispatch(dataThreads());
            threadUser();
            
        } catch (error){
            console.log("error in post like",error)
        }
    }
    
  return {
    handleLikes
  }
}
