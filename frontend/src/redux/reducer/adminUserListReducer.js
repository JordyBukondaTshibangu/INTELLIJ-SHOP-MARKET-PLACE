import { USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_RESET, USERS_LIST_SUCCESS } from "../actionTypes/userActionTypes";


const usersListReducer = (state = { users : [] } , action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {
                loading : true
            }
        case USERS_LIST_SUCCESS:
        return {
            loading : false,
            users : action.payload
        }
        case USERS_LIST_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case USERS_LIST_RESET:
            return {
                users : []
            }
        default:
            return state
    }
}

export default usersListReducer