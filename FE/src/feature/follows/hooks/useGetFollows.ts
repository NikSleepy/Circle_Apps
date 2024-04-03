// import { useEffect } from "react"
import { api } from "../../../libs/api"
import { useDispatch } from "react-redux"
import { STATE_USERALL } from "../../../store/rootReducer"


export  const useGetFollows = () => {
    // const [ follows, setFollows ] = useState<Followers[]>([])

    const dispatch = useDispatch()

    const token = sessionStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const follow = async () => {
      try {
        const response = await api.get('/users', config)
        // setFollows(response.data.data)
        dispatch(STATE_USERALL(response.data.data))
        
      } 
      catch (error) {
        console.log(error);
      }
    }
    // console.log(follows)


    return {

        follow
    }
}