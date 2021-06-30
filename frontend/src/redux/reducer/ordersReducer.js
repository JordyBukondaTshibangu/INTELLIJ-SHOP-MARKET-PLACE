import { ORDERS_FAIL, ORDERS_REQUEST, ORDERS_RESET, ORDERS_SUCCESS } from "../actionTypes/orderActionTypes";

// const emptyOrder = {
//     shippingAddress: {
//         address: "",
//         city: "",
//         postalCode: "",
//         country: ""
//     },
//     taxPrice: 0,
//     shippingPrice: 0,
//     totalPrice: 0,
//     isPaid: false,
//     _id: "",
//     user: "",
//     paymentMethod: true,
//     createdAt: "2021-06-23T14:06:32.948Z",
//     updatedAt: "2021-06-23T14:06:32.948Z",
// }

const initialState = {
    loading : true, 
    orders : [],
    error : ''
}

const ordersReducer = ( state = initialState, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return {
                ...state,
                loading : true
            }
        case ORDERS_SUCCESS:
            return {
                ...state,
                loading : false,
                orders : action.payload
            }
        case ORDERS_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case ORDERS_RESET:
            return {
                ...state,
                orders : []
            }
        default:
            return state
    }
}

export default ordersReducer