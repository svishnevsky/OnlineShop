import fetch from 'isomorphic-fetch'
import * as types from './types'

export const updateBasket = (basket) => {
    return {
        type: types.BASKET_UPDATED,
        basket
    }
}

export const requestBasketUpdate = () => {
    return {
        type: types.BASKET_UPDATE_REQUESTED
    }
}

export function addToBasket(product, qty) {
    return function (dispatch) {
        dispatch(requestBasketUpdate());
        return fetch('/umbraco/api/client/basket', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify({ key: product.key, quantity: qty }) })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(updateBasket(data));
                        }
                    });
            });
    }
}

export function changeQty(key, qty) {
    return function (dispatch) {
        dispatch(requestBasketUpdate());
        return fetch('/umbraco/api/client/basket', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify({ key: key, quantity: qty }) })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(updateBasket(data));
                        }
                    });
            });
    }
}

export function removeItem(key) {
    return function (dispatch) {
        dispatch(requestBasketUpdate());
        return fetch(`/umbraco/api/client/basket?key=${key}`, { method: 'DELETE', headers: { 'Accept': 'application/json' }, credentials: "same-origin" })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(updateBasket(data));
                        }
                    });
            });
    }
}

export function fetchBasket() {
    return function (dispatch) {
        return fetch('/umbraco/api/client/basket', { method: 'GET', headers: { 'Accept': 'application/json' }, credentials: "same-origin" })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(updateBasket(data));
                        }
                    });
            });
    }
}