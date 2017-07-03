import * as types from '../actions/types';

const shipment = (state = { freeMinPrice: 70 }, action) => {
    switch (action.type) {
        case types.SHIPMENT_SET_FREE_MIN_PRICE:
            return Object.assign({}, state, {
                freeMinPrice: action.price
            });
        default:
            return state;
    }
}

export default shipment;