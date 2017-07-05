import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import { fetcProducts } from './actions/catalog'

const store = configureStore(window.initialState);
store.dispatch(fetcProducts());
render(<Root store={store} history={history} />, document.getElementById('app-root'))