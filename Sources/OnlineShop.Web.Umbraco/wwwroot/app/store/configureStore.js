import createHistory from 'history/createHashHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk'

export const history = createHistory();
const middleware = routerMiddleware(history);

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, middleware),
    );
}