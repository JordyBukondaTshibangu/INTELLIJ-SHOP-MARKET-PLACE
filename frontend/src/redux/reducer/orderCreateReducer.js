import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from '../actionTypes/orderActionTypes'

const initialState = { 
    loading : false,
    success : false,
    order : {},
    error : false
}

const orderCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading : true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                order : action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload,
            }
        default:
            return state;
    }
}

export default orderCreateReducer