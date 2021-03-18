import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIIPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../actionTypes/cartActionTypes';

const initialState = {
    cartItems : [],
    shippingAddress : {}
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(element => element.product === item.product)

            if(existItem){
                return {
                    ...state,
                    cartItems : state.cartItems.map(element => element.product === existItem.product ? item : element)
                }
            }else {
                return {
                    ...state, 
                    cartItems : [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems : state.cartItems.filter(item => item.product !== action.payload )
            }  
        case CART_SAVE_SHIIPING_ADDRESS:
            return {
                ...state,
                shippingAddress : action.payload
            } 
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod : action.payload
            }    
        default:
            return state;
    }
}

export default cartReducer;