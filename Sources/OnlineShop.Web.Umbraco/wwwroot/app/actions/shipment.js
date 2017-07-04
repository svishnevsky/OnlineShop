import * as types from './types'

export const setFreeMinPrice = price => {
    return {
        type: types.SHIPMENT_SET_FREE_MIN_PRICE,
        price
    }
}