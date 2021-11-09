import { combineReducers } from "redux";
import UserReducer  from "./UserReducer";
import TokenReducer  from "./TokenReducer";
import CommunityReducer from './Communities'

export const Root = combineReducers({
    user:UserReducer,
    token:TokenReducer,
    communities:CommunityReducer
})