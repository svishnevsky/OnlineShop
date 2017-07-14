import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import shipment from './shipment'
import banner from './banner'
import auth from './auth'
import catalog from './catalog'
import basket from './basket'

const rootReducer = combineReducers({
    shipment,
    banner,
    auth,
    catalog,
    basket,
    router: routerReducer
})

export default rootReducer