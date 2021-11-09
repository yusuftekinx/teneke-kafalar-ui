import { USER_SAVE_DATA } from "../actions/ActionTypes";
import { initialState } from "./initialValue";


function UserReducer (state = initialState.user,action){
    switch(action.type){

        case USER_SAVE_DATA:
            const {username,email,role} = action.payload.payload;
            state.username =username
            state.email = email;
            state.role = role
            return state;



        default:
            return state;
        }

}

export default UserReducer
