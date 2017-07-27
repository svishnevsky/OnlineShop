import * as types from '../actions/types';

const info = (state = {}, action) => {
    switch (action.type) {
        case types.INFO_RECEIVE_ABOUT_US:
            return Object.assign({}, state, {
                aboutUs: action.content
            });
        case types.INFO_RECEIVE_ORDER_CONDITIONS:
            return Object.assign({}, state, {
                orderConditions: action.content
            });
        case types.INFO_RECEIVE_SALES_RULES:
            return Object.assign({}, state, {
                salesRules: action.content
            });
        default:
            return state;
    }
}

export default info;