import { REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS, REVIEW_CREATE_FAIL, REVIEW_CREATE_RESET } from '../actionTypes/productActionTypes';

const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { 
                ...state,
                loading : true , 
            };
        case REVIEW_CREATE_SUCCESS:
            return { 
                ...state,
                loading : false, 
                success : true
            };
        case REVIEW_CREATE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
             };
        case REVIEW_CREATE_RESET:
            return {} ;
        default:
            return state;
    }
};

export default reviewCreateReducer;