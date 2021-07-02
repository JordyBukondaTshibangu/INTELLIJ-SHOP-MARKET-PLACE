
import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS } from '../actionTypes/productActionTypes';



const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case PRODUCT_DELETE_SUCCESS:
            return { 
                ...state,
                loading : false, 
                success : action.payload 
            };
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
             };
        default:
            return state;
    }
};

export default productDeleteReducer;
