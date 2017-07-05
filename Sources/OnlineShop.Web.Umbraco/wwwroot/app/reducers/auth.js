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
        default:
            return state;
    }
}

export default auth;