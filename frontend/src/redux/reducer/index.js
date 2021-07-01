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

const rootReducer = combineReducers({
    productList : productsListReducer,
    productDetail : productDetailReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdate : userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    ordersMyList : ordersReducer,
    usersList : usersListReducer ,
    userDelete : userDeleteReducer,
    userUpdateAdmin : userUpdateAdminReducer
});

export default rootReducer;