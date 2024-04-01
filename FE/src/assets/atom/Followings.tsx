
// import { useGetFollowings } from '../../feature/followings/hooks/useGetFollowings'
import { Box} from '@chakra-ui/react'
import { CardUserFollow } from './CardUserFollow'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/type'
// import { useEffect } from 'react'

export const Followings = () => {
    // const {  followers } = useGetFollowings()
    const followings = useSelector((state:RootState) => state.follow)
    // const data = useSelector((state:RootState) => state.follows)
    // console.log("data di folow redux", followings)  
    // useEffect(() => {
    //     followers()
    // },[followings]);
    
  return (
    <Box>
      {/* <Text>bang</Text> */}
        {followings?.map((items) => (
            <CardUserFollow 
            key={items.id}
            id={items.id}
            username={items.username}
            fullName={items.fullName}
            photo_profile={items.photo_profile}
            isFollow={items.isFollow}/>
            
        ))}
    </Box>
  )
}
