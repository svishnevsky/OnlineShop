import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from './containers/banner'
import auth from './containers/auth/auth'

export default (
    <Switch>
        <Route exact path='/' component={banner} />
        <Route exact path='/auth' component={auth} />
    </Switch>
);