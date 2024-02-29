
import { useDispatch } from "react-redux"
import { api } from "../../../assets/libs/api"
import { STATE_THREAD } from "../../../store/rootReducer"

export const useFecthThread = () => {
    const dispatch = useDispatch()
    const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')} `}
    }
      const getPost = async () => {
            try {
                const response = await api.get('/thread',config)
                dispatch(STATE_THREAD(response.data))
                // setPost(response.data.data)
                console.log("ini dari hooks",response.data.data);
    
            
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getPost
    }
}
