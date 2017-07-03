import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from '../components/App.jsx'

export default class Root extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <ConnectedRouter history={this.props.history}>
                    <Route path='/' component={App} />
                </ConnectedRouter>
            </Provider>
        );
    }
}