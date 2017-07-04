import * as types from './types'

export const setBanner = (url, title) => {
    return {
        type: types.BANNER_SET,
        url: url,
        title: title
    }
}