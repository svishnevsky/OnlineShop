import fetch from 'isomorphic-fetch'
import * as types from './types'

export const updateBasket = (basket) => {
    return {
        type: types.BASKET_UPDATED,
        basket
    }
}

export const requestAddToBasket = () => {
    return {
        type: types.BASKET_ITEM_ADD_REQUESTED
    }
}

export function addToBasket(product, qty) {
    return function (dispatch) {
        dispatch(requestAddToBasket());
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