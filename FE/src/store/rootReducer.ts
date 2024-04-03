import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThreadByIdSlice,  } from "./slice";
import UserSlice from "./slice/UserSlice";
import ThreadSlice from "./slice/ThreadSlice";
import { SearchSlice } from "./slice/UserNotFollows";
import { FollowSlice } from "./slice/UserFollows";
import { FollowerSlice } from "./slice/UserFollower";
import { UserAll } from "./slice/UserALL";
import { ThreadUserSilce } from "./slice/ThreadUser";


// export const { STATE_THREAD,  } = ThreadSlice.actions
export const { STATE_THREAD_BY_ID } = ThreadByIdSlice.actions
export const { STATE_USERALL } = SearchSlice.actions
export const { STATE_FOLLOW } = FollowSlice.actions
export const { STATE_FOLLOWERS } = FollowerSlice.actions
export const { STATE_USER_ALL } = UserAll.actions
export const { STATE_THREAD_USER } = ThreadUserSilce.actions

export const threadByIdReducer = ThreadByIdSlice.reducer
export const searchReducer = SearchSlice.reducer
export const followReducer = FollowSlice.reducer 
export const followersReducer = FollowerSlice.reducer
export const userAllReducer = UserAll.reducer
export const threadUserReducer = ThreadUserSilce.reducer
// export const threadReducer = ThreadSlice.reducer

export const rootReducer = combineReducers({
    threadById: threadByIdReducer,
    thread: ThreadSlice,
    user: UserSlice,
    follows: searchReducer,
    follow: followReducer,
    followers: followersReducer,
    userAll: userAllReducer,
    threadUser: threadUserReducer
})

export const store = configureStore({
    reducer: rootReducer
 })
  
