import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET } from '../actionTypes/userActionTypes'

const initialState = {
    loading : false,
    userInfo : {},
    success : false,
    error : false
}

const userUpdateReducer = (state = initialState, action) => {

    switch (action.type) {
        case  USER_UPDATE_REQUEST :
            return {
                ...state,
                loading : true
            }
        case  USER_UPDATE_SUCCESS :
            return {
                ...state,
                success : true,
                loading : false,
                userInfo : action.payload
            }
        case  USER_UPDATE_FAIL :
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case  USER_UPDATE_RESET :
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        default:
            return state;
    }
}

export default userUpdateReducer 