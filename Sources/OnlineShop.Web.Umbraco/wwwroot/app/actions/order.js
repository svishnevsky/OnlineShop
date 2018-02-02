import fetch from 'isomorphic-fetch'
import * as types from './types'

function confirmingOrder(order) {
    return {
        type: types.ORDER_CONFIRMING,
        order
    }
}

function orderConfirmed() {
    return {
        type: types.ORDER_CONFIRMED
    }
}

export function confirmOrder(order) {
    return function (dispatch) {
        dispatch(confirmingOrder(order));
        return fetch(`/umbraco/api/client/confirmOrder`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify(order) })
            .then(response => {
                if (!response.ok) {
                    return;
                } else {
                    dispatch(orderConfirmed());
                }
            });
    }
}