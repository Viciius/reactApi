import { GET_PRODUCTS, ADD_PRODUCT } from './../../constants/actionTypes';

export const products = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        case ADD_PRODUCT:
            return action.product;
        default: return state;
    }

}
