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
        default:
            return state;
    }
}

export default catalog;