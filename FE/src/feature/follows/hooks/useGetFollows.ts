// import { useEffect } from "react"
import { Api } from "../../../libs/api"
import { useDispatch } from "react-redux"
import { STATE_USERALL } from "../../../store/rootReducer"


export  const useGetFollows = () => {

    const dispatch = useDispatch()

    const follow = async () => {
      try {
        const response = await Api.get('/users')
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