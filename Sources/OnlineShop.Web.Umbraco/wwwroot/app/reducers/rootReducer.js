import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import shipment from './shipment'
import banner from './banner'
import auth from './auth'
import catalog from './catalog'
import basket from './basket'
import location from './location'
import info from './info'

const rootReducer = combineReducers({
    shipment,
    banner,
    auth,
    catalog,
    basket,
    location,
    info,
    router: routerReducer
})

export default rootReducer