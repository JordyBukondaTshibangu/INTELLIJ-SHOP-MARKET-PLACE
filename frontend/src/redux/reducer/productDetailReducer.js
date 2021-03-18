
import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS,  PRODUCT_DETAIL_FAIL} from '../actionTypes/productActionTypes';

const initialStateProduct = {
    loading : false,
    product : {},
    error : false
};

const productDetailReducer = (state = initialStateProduct, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case PRODUCT_DETAIL_SUCCESS:
            return { 
                ...state,
                loading : false, 
                product : action.payload 
            };
        case PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
             };
        default:
            return state;
    }
};

export default productDetailReducer;
