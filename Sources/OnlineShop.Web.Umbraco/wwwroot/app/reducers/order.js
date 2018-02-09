import * as types from '../actions/types';

const order = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_CONFIRMING:
            return Object.assign({}, state, { orderConfirming: true });
        case types.ORDER_CONFIRMED:
            return Object.assign({}, state, {
                orderConfirming: false,
                order: action.order
            });
        case types.ORDERS_LOADING:
            return Object.assign({}, state, {
                ordersLoading: true
            });
        case types.ORDERS_RECEIVED:
            return Object.assign({}, state, {
                ordersLoading: false,
                orders: action.orders
            });
        default:
            return state;
    }
}

export default order;