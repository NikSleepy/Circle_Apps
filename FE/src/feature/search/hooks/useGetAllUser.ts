import { useDispatch } from 'react-redux'
import { Api } from '../../../libs/api'
import { STATE_USER_ALL } from '../../../store/rootReducer'

export const useGetAllUser = () => {
    const dispatch = useDispatch()

    const searchFollow = async () => {
        try {
            const response = await Api.get('/users/all')
            dispatch(STATE_USER_ALL(response.data.data))
        } catch (error) {
            console.log(error)
        }
    }

  return {
    searchFollow
  }
}

