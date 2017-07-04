import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import shipment from '../reducers/shipment'

const rootReducer = combineReducers({
    shipment,
    router: routerReducer
})

export default rootReducer