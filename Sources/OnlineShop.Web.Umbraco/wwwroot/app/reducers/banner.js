import * as types from '../actions/types';

const banner = (state = { title: 'Каталог' }, action) => {
    switch (action.type) {
        case types.BANNER_SET:
            return Object.assign({}, state, {
                url: action.url,
                title: action.title
            });
        default:
            return state;
    }
}

export default banner;