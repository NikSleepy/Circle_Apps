import { useDispatch } from 'react-redux'
import { api } from '../../../libs/api'
import { STATE_USER_ALL } from '../../../store/rootReducer'

export const useGetAllUser = () => {
    const dispatch = useDispatch()

    const token = sessionStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
    const searchFollow = async () => {
        try {
            const response = await api.get('/users/all',config)
            dispatch(STATE_USER_ALL(response.data.data))
        } catch (error) {
            console.log(error)
        }
    }

  return {
    searchFollow
  }
}

