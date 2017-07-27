import { LOCATION_CHANGE } from 'react-router-redux'

const location = (state = null, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            window.scrollTo(0, 0);
            return state;
        default:
            return state;
    }
}

export default location;