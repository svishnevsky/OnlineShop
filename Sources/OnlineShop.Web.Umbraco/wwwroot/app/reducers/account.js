import * as types from '../actions/types';

const account = (state = {}, action) => {
    let patch = {};
    switch (action.type) {
        case types.ACCOUNT_ADDRESS_UPDATED:
            patch[action.addressType] = action.address;
            patch[`${action.addressType}Loading`] = false;
            return Object.assign({}, state, patch);
        case types.ACCOUNT_ADDRESS_LOADING:
            patch[`${action.addressType}Loading`] = true;
            return Object.assign({}, state, patch);
        case types.ACCOUNT_PASSWORD_LOADING:
            return Object.assign({}, state, { passwordLoading: true });
        case types.ACCOUNT_PASSWORD_CHANGED:
            return Object.assign({}, state, { passwordLoading: false });
        default:
            return state;
    }
}

export default account;