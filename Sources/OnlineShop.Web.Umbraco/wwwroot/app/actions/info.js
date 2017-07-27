import fetch from 'isomorphic-fetch'
import * as types from './types'

export const receiveAboutUs = (content) => {
    return {
        type: types.INFO_RECEIVE_ABOUT_US,
        content
    }
}

export function fetchAboutUs() {
    return function (dispatch) {
        return fetch('/umbraco/api/client/info?alias=aboutUs')
            .then(response => {
                response.json()
                    .then(data => {
                        dispatch(receiveAboutUs(data.content));
                    });
            });
    }
}


export const receiveOrderConditions = (content) => {
    return {
        type: types.INFO_RECEIVE_ORDER_CONDITIONS,
        content
    }
}

export function fetchOrderConditions() {
    return function (dispatch) {
        return fetch('/umbraco/api/client/info?alias=orderConditions')
            .then(response => {
                response.json()
                    .then(data => {
                        dispatch(receiveOrderConditions(data.content));
                    });
            });
    }
}


export const receiveSalesRules = (content) => {
    return {
        type: types.INFO_RECEIVE_SALES_RULES,
        content
    }
}

export function fetchSalesRules() {
    return function (dispatch) {
        return fetch('/umbraco/api/client/info?alias=salesRules')
            .then(response => {
                response.json()
                    .then(data => {
                        dispatch(receiveSalesRules(data.content));
                    });
            });
    }
}