
import { ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL} from '../actionTypes/orderActionTypes';

const initialStateOrder = {
    loading : false,
    // orderItems : [],
    shippingAddress : {},
    order : {
        _id:"",
        taxPrice:0,
        shippingPrice:0,
        totalPrice:0,
        isPaid :false,
        user:"",
        orderItems:[],
        shippingAddress:
            {  
                address:"",
                city:"",
                postalCode:"",
                country:""
            },
        paymentMethod:true
        },
    error : false
};

const orderDetailsReducer = (state = initialStateOrder, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { 
                ...state,
                loading : true, 
            };
        case ORDER_DETAILS_SUCCESS:
            return { 
                ...state,
                loading : false, 
                order : action.payload, 
            };
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
             };
        default:
            return state;
    }
};

export default orderDetailsReducer;
