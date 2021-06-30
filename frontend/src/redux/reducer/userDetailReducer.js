import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET } from '../actionTypes/userActionTypes'

const initialState = {
    loading : false,
    user : {},
    error : false
}

const userDetailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case  USER_DETAILS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case  USER_DETAILS_SUCCESS :
            return {
                ...state,
                loading : false,
                user : action.payload
            }
        case  USER_DETAILS_FAIL :
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case  USER_DETAILS_RESET :
            return {
                ...state,
                user : {}
            }
        default:
            return state;
    }
}

export default userDetailsReducer 