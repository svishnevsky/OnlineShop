import * as types from './types'

export const setFreeMinPrice = price => {
    return {
        type: types.OPTIONS_SET_FREE_MIN_PRICE,
        price
    }
}