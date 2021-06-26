import { ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET } from '../actionTypes/orderActionTypes'

const initialState = { 
    loading : false,
    success : false,
    error : false
}

const orderPayReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading : true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading : false,
                success : true,
            }
        case ORDER_PAY_FAIL:
            return {
                loading : false,
                error : action.payload,
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
}

export default orderPayReducer