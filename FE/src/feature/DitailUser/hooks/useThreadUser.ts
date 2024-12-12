// import React from 'react'
import { useDispatch } from 'react-redux'
import { api } from '../../../libs/api'
import { STATE_THREAD_USER } from '../../../store/rootReducer'

export const useThreadUser = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const threadUser = async() => {
        try {
            const response = await api.get('/thread/user/byid', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(STATE_THREAD_USER(response.data.data))
        } catch (error) {
            console.log('error get data thread user')
        }
    }


  return {
    threadUser
  }
}
