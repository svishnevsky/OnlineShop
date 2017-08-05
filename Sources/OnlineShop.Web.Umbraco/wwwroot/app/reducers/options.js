import * as types from '../actions/types';

const options = (state = { freeMinPrice: 70 }, action) => {
    switch (action.type) {
        case types.OPTIONS_SET_FREE_MIN_PRICE:
            return Object.assign({}, state, {
                freeMinPrice: action.price
            });
        default:
            return state;
    }
}

export default options;