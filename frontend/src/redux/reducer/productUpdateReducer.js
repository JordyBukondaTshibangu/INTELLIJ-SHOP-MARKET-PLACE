
import { PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from '../actionTypes/productActionTypes';

const initialStateProduct = {
    loading : false,
    product : {},
    error : false,
    success : false
};

const productUpdateReducer = (state = initialStateProduct, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case PRODUCT_UPDATE_SUCCESS:
            return { 
                ...state,
                loading : false, 
                product : action.payload,
                success : true
            };
        case PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
             };
        case PRODUCT_UPDATE_RESET:
            return {} ;
        default:
            return state;
    }
};

export default productUpdateReducer;
