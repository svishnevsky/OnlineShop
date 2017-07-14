import fetch from 'isomorphic-fetch'
import * as types from './types'

export const setCategories = (categories) => {
    return {
        type: types.CATALOG_CATEGORIES_SET,
        categories
    }
}

export const receiveProducts = (products) => {
    return {
        type: types.CATALOG_PRODUCTS_RECEIVE,
        products
    }
}

export const receiveProduct = (product) => {
    return {
        type: types.CATALOG_PRODUCT_RECEIVE,
        product
    }
}

export const requestProduct = () => {
    return {
        type: types.CATALOG_PRODUCT_REQUEST
    }
}

export function fetchProducts() {
    return function (dispatch) {
        return fetch('/umbraco/api/client/products')
            .then(response => {
                response.json()
                    .then(data => {
                        dispatch(receiveProducts(data.products));
                    });
            });
    }
}

export function fetchProduct(key) {
    return function (dispatch) {
        dispatch(requestProduct());
        return fetch(`/umbraco/api/client/products?key=${key}`)
            .then(response => {
                response.json()
                    .then(data => {
                        dispatch(receiveProduct(data));
                    });
            });
    }
}