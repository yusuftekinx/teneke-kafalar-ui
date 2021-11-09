import { SAVE_ALL_COMMUNITIES, SAVE_USER_TOKEN, USER_SAVE_DATA } from "./ActionTypes";


export const onChangeStateToUser = (user) => ({
    type:USER_SAVE_DATA,
    payload:user
})

export const onChangeWindowWidth = (width) => ({
    type:USER_SAVE_DATA,
    payload:width
})

export const onAllCommunitiesSave = (communties) => ({
    type:SAVE_ALL_COMMUNITIES,
    payload:communties
}) 

export const onSaveUserToken = (token) => ({
    type:SAVE_USER_TOKEN,
    payload:token
})