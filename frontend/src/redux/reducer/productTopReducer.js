import { PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS } from '../actionTypes/productActionTypes';

const initialStateProducts = {
    loading : false,
    products : [],
    error : false
};

const productTopRatingReducer = (state = initialStateProducts, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case PRODUCT_TOP_SUCCESS:
            return { 
                ...state,
                loading : false, 
                products : action.payload,

            };
        case PRODUCT_TOP_FAIL:
            return {
                ...state,
                loading : false, 
                error : action.payload
             };
        default:
            return state;
    }
};

export default productTopRatingReducer;


