import { combineReducers } from 'redux';
import productsListReducer from './productsListReducer';
import  productDetailReducer from './productDetailReducer'
import cartReducer from './cartReducer'
import userLoginReducer from './userLoginReducer'
import userRegisterReducer from './userRegisterReducer'
import userDetailsReducer from './userDetailReducer'
import userUpdateReducer from './userUpdateReducer'
import orderCreateReducer from './orderCreateReducer'
import orderDetailsReducer from './orderDetailsReducer'

const rootReducer = combineReducers({
    productList : productsListReducer,
    productDetail : productDetailReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdate : userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer
});

export default rootReducer;