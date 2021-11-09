import { SAVE_USER_TOKEN } from "../actions/ActionTypes";
import { initialState } from "./initialValue";


function TokenReducer (state = initialState.token,action){
    switch(action.type){
        case SAVE_USER_TOKEN:
            state = action.payload.payload
            return state;

        default:
            return state;
        }

}

export default TokenReducer
