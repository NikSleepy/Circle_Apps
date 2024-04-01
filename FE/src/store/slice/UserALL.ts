import { createSlice } from "@reduxjs/toolkit"

interface IFollowers {
    id:number
    fullName:string
    username:string
    photo_profile:string
    isFollow:boolean

  }

const initialUserAllState: IFollowers[] = []

export const UserAll = createSlice({
    name:'userAll',
    initialState:initialUserAllState,
    reducers: {
        STATE_USER_ALL: (_, action )=> {
            const data: IFollowers[] = action.payload.map((items: IFollowers)=> {
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