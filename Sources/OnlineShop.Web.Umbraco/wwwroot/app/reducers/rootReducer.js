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

const rootReducer = combineReducers({
    options,
    banner,
    auth,
    catalog,
    basket,
    location,
    info,
    account,
    router: routerReducer
})

export default rootReducer