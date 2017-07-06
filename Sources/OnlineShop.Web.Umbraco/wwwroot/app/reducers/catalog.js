import * as types from '../actions/types';

const catalog = (state = {}, action) => {
    switch (action.type) {
        case types.CATALOG_CATEGORIES_SET:
            return Object.assign({}, state, {
                categories: action.categories
            });
        case types.CATALOG_PRODUCTS_RECEIVE:
            return Object.assign({}, state, {
                products: action.products
            });
        case types.CATALOG_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                product: undefined
            });
        case types.CATALOG_PRODUCT_RECEIVE:
            return Object.assign({}, state, {
                product: action.product
            });
        default:
            return state;
    }
}

export default catalog;