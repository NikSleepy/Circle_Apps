// import { useEffect } from "react"
import { Api } from "../../../libs/api"
import { useDispatch } from "react-redux"
import { STATE_USERALL } from "../../../store/rootReducer"


export  const useGetFollows = () => {

    const dispatch = useDispatch()

    const follow = async () => {
      try {
        const token = sessionStorage.getItem("token")
        const response = await Api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
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