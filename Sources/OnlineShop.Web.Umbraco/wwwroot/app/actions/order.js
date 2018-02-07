import fetch from 'isomorphic-fetch'
import * as types from './types'
import { fetchBasket } from './basket'

function confirmingOrder(order) {
    return {
        type: types.ORDER_CONFIRMING,
        order
    }
}

function orderConfirmed(order) {
    return {
        type: types.ORDER_CONFIRMED,
        order
    }
}

export function confirmOrder(order) {
    return function (dispatch) {
        dispatch(confirmingOrder(order));
        return fetch(`/umbraco/api/client/confirmOrder`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify(order) })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(orderConfirmed(data));
                            dispatch(fetchBasket());
                        }
                    });
            });
    }
}