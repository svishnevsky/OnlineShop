import * as types from '../actions/types';

const auth = (state = { name: null, login: { isFetching: false, success: true }, register: {} }, action) => {
    switch (action.type) {
        case types.AUTH_REQUEST_LOGIN:
            return Object.assign({}, state, {
                login: {
                    isFetching: true
                }
            });
        case types.AUTH_RECEIVE_LOGIN:
            return Object.assign({}, state, {
                login: {
                    isFetching: false,
                    success: action.success
                },
                name: action.name
            });
        default:
            return state;
    }
}

export default auth;