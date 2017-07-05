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
        name: name,
        error: error
    }
}

//const requestRegister = () => {
//    return {
//        type: types.AUTH_REQUEST_REGISTER
//    }
//}

//const receiveRegister = (data) => {
//    return {
//        type: types.AUTH_RECEIVE_REGISTER,
//        name: data.name
//    }
//}

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