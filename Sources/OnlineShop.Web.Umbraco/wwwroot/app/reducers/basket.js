import * as types from '../actions/types';

const basket = (state = { items: [], updating: false }, action) => {
    switch (action.type) {
        case types.BASKET_UPDATE_REQUESTED:
            return Object.assign({}, state, {
                updating: true
            });
        case types.BASKET_UPDATED:
            return Object.assign({}, state, {
                updating: false,
                items: action.basket.items,
                totalCount: action.basket.totalCount,
                totalPrice: action.basket.totalPrice
            });
        default:
            return state;
    }
}

export default basket;