import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_SHIIPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../actionTypes/cartActionTypes'

export const addTocart = (id, qty ) => async (dispatch , getState) => {

    try {

        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)

        dispatch({
            type : CART_ADD_ITEM,
            payload : {
                product : data._id,
                name : data.name,
                image : data.image,
                price : data.price,
                countInStock : data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error)
    }
}

export const removeFromCart = id => (dispatch, getState) => {
    try {
        dispatch({
            type : CART_REMOVE_ITEM,
            payload : id
        })
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error.message)
    }
}

export const saveShipingAddress =  data => dispatch => {
        dispatch({
            type : CART_SAVE_SHIIPING_ADDRESS,
            payload : data
        })
        localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod =  data => dispatch => {
    dispatch({
        type : CART_SAVE_PAYMENT_METHOD,
        payload : data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

