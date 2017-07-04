import fetch from 'isomorphic-fetch'
import * as types from './types'

const requestLogin = () => {
    return {
        type: types.AUTH_REQUEST_LOGIN
    }
}

const receiveLogin = (data) => {
    return {
        type: types.AUTH_RECEIVE_LOGIN,
        name: data.body.name,
        success: data.success
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
                    dispatch(receiveLogin({ success: false }));
                    return;
                }

                response.json()
                    .then(data => {
                        dispatch(receiveLogin({ success: true, body: data }));
                    });
            });
    }
}