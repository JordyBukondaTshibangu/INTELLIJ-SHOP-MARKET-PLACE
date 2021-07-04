import axios from 'axios';
import { ORDERS_RESET } from '../actionTypes/orderActionTypes';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_DETAILS_RESET, USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_LIST_FAIL, USERS_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_ADMIN_REQUEST, USER_UPDATE_ADMIN_SUCCESS, USER_UPDATE_ADMIN_FAIL } from '../actionTypes/userActionTypes';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../actionTypes/userActionTypes';
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../actionTypes/userActionTypes';
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../actionTypes/userActionTypes'

export const loginUser = (email, password) => async(dispatch) => {
    try {
        dispatch({ type : USER_LOGIN_REQUEST})

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('http://localhost:5000/api/users/login', { email, password}, config)

        const { data } = res

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        console.log(data)

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const logoutUser = () => dispatch => {

    localStorage.removeItem('userInfo');
    dispatch({ type : USER_LOGOUT });
    dispatch({ type : ORDERS_RESET });
    dispatch({ type : USER_DETAILS_RESET });
    dispatch({ type : USERS_LIST_RESET });
}
export const registerUser = (name, email, password) => async(dispatch) => {

    try {
            dispatch({ type : USER_REGISTER_REQUEST })

            const config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
    
            const res = await axios.post('http://localhost:5000/api/users', { name, email, password}, config)
    
            const { data } = res
    
            dispatch({
                type : USER_REGISTER_SUCCESS,
                payload : data
            })
    
            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload : data
            })
    
            localStorage.setItem('userInfo', JSON.stringify(data))
            
        } catch (error) {
            console.log('THIS IS THE ERROR ', error)
            dispatch({
                type : USER_REGISTER_FAIL,
                payload : error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}
export const getUserDetail = id => async(dispatch, getState ) => {

    try {
            dispatch({ type : USER_DETAILS_REQUEST })

            const { userLogin : { userInfo } } = getState()

            const config = {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization :  `Bearer ${userInfo.token}`
                }
            }
    
            const res = await axios.get(`http://localhost:5000/api/users/${id}`, config)
    
            const { data } = res
    
            dispatch({
                type : USER_DETAILS_SUCCESS,
                payload : data
            })
            
        } catch (error) {
            console.log('THIS IS THE ERROR ', error)
            dispatch({
                type : USER_DETAILS_FAIL,
                payload : error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}
export const updateUserProfil= user => async(dispatch, getState ) => {

    try {
            dispatch({ type : USER_UPDATE_REQUEST })

            const { userLogin : { userInfo } } = getState()

            const config = {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization :  `Bearer ${userInfo.token}`
                }
            }
    
            const res = await axios.put('http://localhost:5000/api/users/profile', user, config)
    
            const { data } = res
    
            dispatch({
                type : USER_UPDATE_SUCCESS,
                payload : data
            })

            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload : data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
            
        } catch (error) {
            console.log('THIS IS THE ERROR ', error)
            dispatch({
                type : USER_UPDATE_FAIL,
                payload : error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}


// ADMIN ACTIONS 

export const getUsersList = () => async(dispatch, getState ) => {

    try {
            dispatch({ type : USERS_LIST_REQUEST})

            const { userLogin : { userInfo } } = getState()

            const config = {
                headers : {
                    Authorization :  `Bearer ${userInfo.token}`
                }
            }
    
            const res = await axios.get('http://localhost:5000/api/users/', config)
    
            const { data } = res
    
            dispatch({
                type : USERS_LIST_SUCCESS,
                payload : data
            })
            
        } catch (error) {
            console.log('THIS IS THE ERROR ', error)
            dispatch({
                type : USERS_LIST_FAIL,
                payload : error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}
export const updateUserAdmin= (user, id) => async(dispatch, getState ) => {

    try {
            dispatch({ type : USER_UPDATE_ADMIN_REQUEST })

            const { userLogin : { userInfo } } = getState()

            const config = {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization :  `Bearer ${userInfo.token}`
                }
            }
    
            const res = await axios.put(`http://localhost:5000/api/users/${id}`, user, config)
    
            const { data } = res
    
            dispatch({
                type : USER_UPDATE_ADMIN_SUCCESS,
                payload : data
            })
            
        } catch (error) {
            console.log('THIS IS THE ERROR ', error)
            dispatch({
                type : USER_UPDATE_ADMIN_FAIL,
                payload : error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}
export const deleteUser = id => async(dispatch, getState ) => {

    try {
            dispatch({ type : USER_DELETE_REQUEST })

            const { userLogin : { userInfo } } = getState()

            const config = {
                headers : {
                    Authorization :  `Bearer ${userInfo.token}`
                }
            }
    
            const res = await axios.delete(`http://localhost:5000/api/users/${id}`, config)
    
            const { data } = res
    
            dispatch({
                type : USER_DELETE_SUCCESS,
                payload : data
            })
            
        } catch (error) {
            console.log('THIS IS THE ERROR ', error)
            dispatch({
                type : USER_DELETE_FAIL,
                payload : error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}
