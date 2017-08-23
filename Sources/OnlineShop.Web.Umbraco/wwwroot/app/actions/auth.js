import fetch from 'isomorphic-fetch'
import * as types from './types'

const requestLogin = () => {
    return {
        type: types.AUTH_REQUEST_LOGIN
    }
}

const receiveLogin = (name, error) => {
    return {
        type: types.AUTH_RECEIVE_LOGIN,
        name,
        error
    }
}

const receiveLogout = () => {
    return {
        type: types.AUTH_RECEIVE_LOGOUT
    }
}

const requestRegister = () => {
    return {
        type: types.AUTH_REQUEST_REGISTER
    }
}

const receiveRegister = (name, errors) => {
    return {
        type: types.AUTH_RECEIVE_REGISTER,
        name,
        errors
    }
}

export function sendLogin(username, password) {
    return function (dispatch) {
        dispatch(requestLogin());
        const token = btoa(`${username}|${password}`);
        return fetch('/umbraco/api/client/users', { headers: { Authorization: `Basic ${token}` }, credentials: "same-origin" })
            .then(response => {
                if (!response.ok)
                {
                    dispatch(receiveLogin(undefined, 'Неверный логин или пароль.'));
                    return;
                }

                response.json()
                    .then(data => {
                        dispatch(receiveLogin(data.name));
                    });
            });
    }
}

export function logout() {
    return function (dispatch) {
        return fetch('/umbraco/api/client/users', { method: 'DELETE', credentials: "same-origin" })
            .then(response => {
                if (response.ok) {
                    dispatch(receiveLogout());
                }
            });
    }
}

export function sendRegister(user) {
    return function (dispatch) {
        dispatch(requestRegister());
        return fetch('/umbraco/api/client/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify(user) })
            .then(response => {
                response.json()
                    .then(data => {
                        if (!response.ok) {
                            dispatch(receiveRegister(undefined, data.errors || [data.Message]));
                            return;
                        } else {
                            dispatch(receiveRegister(data.name));
                        }
                    });
            });
    }
}

export function restorePassword(username) {
    return function () {
        return fetch('/umbraco/api/client/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: "same-origin", body: JSON.stringify({ username }) });
    }
}