import { SAVE_ALL_COMMUNITIES, } from "../actions/ActionTypes";
import { initialState } from "./initialValue";


function CommunityReducer (state = initialState.communities,action){
    switch(action.type){

        case SAVE_ALL_COMMUNITIES:
            state = action.payload.payload;
            return state;
        default:
            return state;
        }

}

export default CommunityReducer
