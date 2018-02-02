import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import options from './options'
import banner from './banner'
import auth from './auth'
import catalog from './catalog'
import basket from './basket'
import location from './location'
import info from './info'
import account from './account'
import order from './order'

const rootReducer = combineReducers({
    options,
    banner,
    auth,
    catalog,
    basket,
    location,
    info,
    account,
    order,
    router: routerReducer
})

export default rootReducer