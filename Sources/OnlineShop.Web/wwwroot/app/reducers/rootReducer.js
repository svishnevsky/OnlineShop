import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import shipment from './shipment'
import banner from './banner'

const rootReducer = combineReducers({
    shipment,
    banner,
    router: routerReducer
})

export default rootReducer