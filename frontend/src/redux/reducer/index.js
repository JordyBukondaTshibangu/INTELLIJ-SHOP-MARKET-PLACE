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
import orderPayReducer from './orderPayReducer'
import ordersReducer from './ordersReducer';
import usersListReducer from './adminUserListReducer';
import userDeleteReducer from './adminUserDeleteReducer';
import userUpdateAdminReducer from './adminUserUpdateReducer';
import productDeleteReducer from './productDeleteReducer';
import productCreateReducer from './productCreateReducer'
import productUpdateReducer from './productUpdateReducer';
import orderListReducer from './orderListReducer';
import orderDeliverReducer from './orderDeliverReducer';

const rootReducer = combineReducers({
    productList : productsListReducer,
    productDetail : productDetailReducer,
    productDelete : productDeleteReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdate : userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderDeliver : orderDeliverReducer,
    ordersMyList : ordersReducer,
    orderList : orderListReducer,
    usersList : usersListReducer ,
    userDelete : userDeleteReducer,
    userUpdateAdmin : userUpdateAdminReducer
});

export default rootReducer;