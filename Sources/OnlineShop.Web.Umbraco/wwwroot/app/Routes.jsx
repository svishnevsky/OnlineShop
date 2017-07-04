import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from './containers/banner'
import Auth from './components/auth/Auth.jsx'

export default (
    <Switch>
        <Route exact path='/' component={banner} />
        <Route exact path='/auth' component={Auth} />
    </Switch>
);