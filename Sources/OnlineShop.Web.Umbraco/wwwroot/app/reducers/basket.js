import * as types from '../actions/types';

const basket = (state = { items: [], itemAdding: false }, action) => {
    switch (action.type) {
        case types.BASKET_ITEM_ADD_REQUESTED:
            return Object.assign({}, state, {
                itemAdding: true
            });
        case types.BASKET_UPDATED:
            return Object.assign({}, state, {
                itemAdding: false,
                items: action.basket.items,
                totalCount: action.basket.totalCount,
                totalPrice: action.basket.totalPrice
            });
        default:
            return state;
    }
}

export default basket;