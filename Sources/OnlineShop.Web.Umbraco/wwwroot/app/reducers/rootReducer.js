import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import shipment from './shipment'
import banner from './banner'
import auth from './auth'

const rootReducer = combineReducers({
    shipment,
    banner,
    auth,
    router: routerReducer
})

export default rootReducer