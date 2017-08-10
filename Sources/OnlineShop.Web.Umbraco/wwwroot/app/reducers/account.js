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
        default:
            return state;
    }
}

export default account;