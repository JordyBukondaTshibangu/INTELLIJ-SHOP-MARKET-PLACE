import { USER_UPDATE_ADMIN_FAIL, USER_UPDATE_ADMIN_REQUEST, USER_UPDATE_ADMIN_SUCCESS } from "../actionTypes/userActionTypes";


const userUpdateAdminReducer = (state = { user : {}} , action) => {
    switch (action.type) {
        case USER_UPDATE_ADMIN_REQUEST:
            return {
                loading : true
            }
        case USER_UPDATE_ADMIN_SUCCESS:
        return {
            loading : false,
            user : action.payload
        }
        case USER_UPDATE_ADMIN_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}

export default userUpdateAdminReducer