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

export function fetcProducts() {
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