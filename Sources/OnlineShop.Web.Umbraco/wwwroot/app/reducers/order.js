﻿import * as types from '../actions/types';

const order = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_CONFIRMING:
            return Object.assign({}, state, { orderConfirming: true });
        case types.ORDER_CONFIRMED:
            return Object.assign({}, state, {
                orderConfirming: false,
                order: action.order
            });
        default:
            return state;
    }
}

export default order;