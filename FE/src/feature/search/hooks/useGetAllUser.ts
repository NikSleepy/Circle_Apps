import { useDispatch } from 'react-redux'
import { Api } from '../../../libs/api'
import { STATE_USER_ALL } from '../../../store/rootReducer'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export const useGetAllUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchFollow = async () => {
        try {
            const response = await Api.get('/users/all')
            dispatch(STATE_USER_ALL(response.data.data))
        } catch (error) {
          const axiosError = error as AxiosError;
          if(axiosError.response?.status === 401) {
              navigate('/login')
          }
        }
    }

  return {
    searchFollow
  }
}

