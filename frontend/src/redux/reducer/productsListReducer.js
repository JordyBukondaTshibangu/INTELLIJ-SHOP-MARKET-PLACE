import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,  PRODUCT_LIST_FAIL} from '../actionTypes/productActionTypes';

const initialStateProducts = {
    loading : false,
    products : [],
    error : false
};

const productsListReducer = (state = initialStateProducts, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case PRODUCT_LIST_SUCCESS:
            return { 
                ...state,
                loading : false, 
                products : action.payload 
            };
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading : false, 
                error : action.payload
             };
        default:
            return state;
    }
};

export default productsListReducer;


