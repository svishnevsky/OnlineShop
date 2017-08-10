﻿import fetch from 'isomorphic-fetch'
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

function loadPassword() {
    return {
        type: types.ACCOUNT_PASSWORD_LOADING
    }
}

function passwordChanged() {
    return {
        type: types.ACCOUNT_PASSWORD_CHANGED
    }
}

export function changePassword(password) {
    return function (dispatch) {
        dispatch(loadPassword());
        return fetch('/umbraco/api/client/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify({ password: password }) })
            .then(response => {
                if (!response.ok) {
                    return;
                } else {
                    dispatch(passwordChanged());
                }
            });
    }
}