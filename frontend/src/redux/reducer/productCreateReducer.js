
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS } from '../actionTypes/productActionTypes';

const initialStateProduct = {
    loading : false,
    product : {},
    error : false
};

const productCreateReducer = (state = initialStateProduct, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case PRODUCT_CREATE_SUCCESS:
            return { 
                ...state,
                loading : false, 
                product : action.payload,
                success : true
            };
        case PRODUCT_CREATE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
             };
        case PRODUCT_CREATE_RESET:
            return {} ;
        default:
            return state;
    }
};

export default productCreateReducer;
