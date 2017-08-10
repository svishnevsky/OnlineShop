import fetch from 'isomorphic-fetch'
import * as types from './types'

function updateUserAddress(address, addressType) {
    return {
        type: types.ACCOUNT_ADDRESS_UPDATED,
        address,
        addressType
    }
}

function loadAddress(addressType) {
    return {
        type: types.ACCOUNT_ADDRESS_LOADING,
        addressType
    }
}

export function fetchAddress(type) {
    return function (dispatch) {
        dispatch(loadAddress(type));
        return fetch(`/umbraco/api/client/${type}`, { method: 'GET', headers: { 'Accept': 'application/json' }, credentials: "same-origin" })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            return;
                        } else {
                            dispatch(updateUserAddress(data, type));
                        }
                    });
            });
    }
}

export function updateAddress(address, type) {
    return function (dispatch) {
        dispatch(loadAddress(type));
        return fetch(`/umbraco/api/client/${type}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify(address) })
            .then(response => {
                if (!response.ok) {
                    return;
                } else {
                    dispatch(updateUserAddress(address, type));
                }
            });
    }
}