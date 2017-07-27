import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import { fetchProducts } from './actions/catalog'
import { fetchBasket } from './actions/basket'
import { fetchAboutUs, fetchOrderConditions, fetchSalesRules } from './actions/info'

const store = configureStore(window.initialState);
store.dispatch(fetchProducts());
store.dispatch(fetchBasket());
store.dispatch(fetchAboutUs());
store.dispatch(fetchOrderConditions());
store.dispatch(fetchSalesRules());
render(<Root store={store} history={history} />, document.getElementById('app-root'))