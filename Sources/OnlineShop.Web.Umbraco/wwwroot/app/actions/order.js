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

function updateOrders(orders) {
    return {
        type: types.ORDERS_RECEIVED,
        orders
    }
}

function loadOrders() {
    return {
        type: types.ORDERS_LOADING
    }
}

export function fetchOrders() {
    return function (dispatch) {
        dispatch(loadOrders());
        return fetch(`/umbraco/api/client/orders`, { method: 'GET', headers: { 'Accept': 'application/json' }, credentials: "same-origin" })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(updateOrders(data.orders));
                        }
                    });
            });
    }
}