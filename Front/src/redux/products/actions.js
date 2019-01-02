import { GET_PRODUCTS } from './../../constants/actionTypes';

export const getProducts = (products) =>{
    return({
        type: GET_PRODUCTS,
        products
    });
}