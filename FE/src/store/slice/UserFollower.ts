import { createSlice } from "@reduxjs/toolkit"

interface IFollowers {
    id:number
    fullName:string
    username:string
    photo_profile:string
    isFollow:boolean

  }

const initialFollowerState: IFollowers[] = []

export const FollowerSlice = createSlice({
    name:'followers',
    initialState:initialFollowerState,
    reducers: {
        STATE_FOLLOWERS: (_, action) => {
            const data: IFollowers[] = action.payload.map((items:IFollowers)=> {
                return {
                    id:items.id,
                    username:items.username,
                    fullName:items.fullName,
                    photo_profile:items.photo_profile,
                    isFollow:items.isFollow
                }
            })
            return data
        }
    }
})