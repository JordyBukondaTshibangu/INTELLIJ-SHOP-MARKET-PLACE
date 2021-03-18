import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL} from '../actionTypes/orderActionTypes'
import { ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL} from '../actionTypes/orderActionTypes'
import axios from 'axios'

export const createOrder = order => async(dispatch, getState) => {
    try {
        dispatch({ type : ORDER_CREATE_REQUEST })

        console.log(order)

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
        console.log(data.order)

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