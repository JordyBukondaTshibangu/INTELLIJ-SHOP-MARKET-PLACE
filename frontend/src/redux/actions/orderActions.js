import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDERS_REQUEST, ORDERS_FAIL, ORDERS_SUCCESS} from '../actionTypes/orderActionTypes'
import { ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL} from '../actionTypes/orderActionTypes'
import axios from 'axios'

export const createOrder = order => async(dispatch, getState) => {
    try {
        dispatch({ type : ORDER_CREATE_REQUEST })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization :  `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.post('http://localhost:5000/api/orders', order, config)

        const { data } = res

        dispatch({
            type : ORDER_CREATE_SUCCESS,
            payload : data.order
        })
        
    } catch (error) {
        dispatch({
            type : ORDER_CREATE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getOrderDetails = id => async(dispatch, getState) => {

    try {
        dispatch({ type : ORDER_DETAILS_REQUEST })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers : {
                Authorization :  `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, config)

        const { data } = res 

        dispatch({
            type : ORDER_DETAILS_SUCCESS,
            payload : data.order
        })
        
    } catch (error) {
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {

    try {
        dispatch({ type : ORDER_PAY_REQUEST })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization :  `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, paymentResult, config)

        const { data } = res 

        dispatch({
            type : ORDER_PAY_SUCCESS,
            payload : data.order
        })
        
    } catch (error) {
        dispatch({
            type : ORDER_PAY_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getMyOrders = () => async(dispatch, getState) => {

    try {
        dispatch({ type : ORDERS_REQUEST })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers : {
                Authorization :  `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get(`http://localhost:5000/api/orders/myorders`, config)

        const { data } = res 

        console.log(data)

        dispatch({
            type : ORDERS_SUCCESS,
            payload : data.orders
        })
        
    } catch (error) {
        dispatch({
            type : ORDERS_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}