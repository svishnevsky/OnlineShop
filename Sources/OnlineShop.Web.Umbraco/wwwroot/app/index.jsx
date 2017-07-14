import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import { fetchProducts } from './actions/catalog'
import { fetchBasket } from './actions/basket'

const store = configureStore(window.initialState);
store.dispatch(fetchProducts());
store.dispatch(fetchBasket());
render(<Root store={store} history={history} />, document.getElementById('app-root'))