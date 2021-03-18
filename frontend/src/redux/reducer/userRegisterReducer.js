import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../actionTypes/userActionTypes'

const initialState = {
    loading : false,
    userInfo : {},
    error : false
}

const userRegisterReducer = (state = initialState, action) => {

    switch (action.type) {
        case  USER_REGISTER_REQUEST :
            return {
                ...state,
                loading : true
            }
        case  USER_REGISTER_SUCCESS :
            return {
                ...state,
                loading : false,
                userInfo : action.payload
            }
        case  USER_REGISTER_FAIL :
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        default:
            return state;
    }
}

export default userRegisterReducer 