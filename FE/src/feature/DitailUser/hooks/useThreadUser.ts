// import React from 'react'
import { useDispatch } from 'react-redux'
import { Api } from '../../../libs/api'
import { STATE_THREAD_USER } from '../../../store/rootReducer'

export const useThreadUser = () => {
    const dispatch = useDispatch()
    const threadUser = async() => {
        try {
            const response = await Api.get('/thread/user/byid')
            console.log(response.data.data)
            dispatch(STATE_THREAD_USER(response.data.data))
        } catch (error) {
            console.log('error get data thread user')
        }
    }


  return {
    threadUser
  }
}
