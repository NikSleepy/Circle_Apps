import { createSlice } from "@reduxjs/toolkit"

interface IFollowers {
    id:number
    fullName:string
    username:string
    photo_profile:string
    isFollow:boolean

  }


const initialUserFollowState: IFollowers[] = []

export const SearchSlice = createSlice({
    name:'search',
    initialState: initialUserFollowState,
    reducers: {
        STATE_USERALL: (_, action ) => {
            const data: IFollowers[] = action.payload.map((item: IFollowers) => {
                return {
                    id:item.id,
                    username:item.username,
                    fullName:item.fullName,
                    photo_profile:item.photo_profile,
                    isFollow:item.isFollow
                }
            })
            // console.log("slice",data)
            return data
        }

    }
})