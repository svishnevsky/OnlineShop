import * as types from '../actions/types';

const auth = (state = { name: null, login: {}, register: {} }, action) => {
    switch (action.type) {
        case types.AUTH_REQUEST_LOGIN:
            return Object.assign({}, state, {
                login: {
                    loading: true,
                    error: undefined
                }
            });
        case types.AUTH_RECEIVE_LOGIN:
            return Object.assign({}, state, {
                login: {
                    loading: false,
                    error: action.error
                },
                name: action.name
            });
        case types.AUTH_RECEIVE_LOGOUT:
            return Object.assign({}, state, {
                login: {},
                name: undefined
            });
        case types.AUTH_REQUEST_REGISTER:
            return Object.assign({}, state, {
                register: {
                    loading: true,
                    errors: undefined
                }
            });
        case types.AUTH_RECEIVE_REGISTER:
            return Object.assign({}, state, {
                register: {
                    loading: false,
                    errors: action.errors
                },
                name: action.name
            });
        default:
            return state;
    }
}

export default auth;