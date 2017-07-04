import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from './containers/banner'

export default (
    <Switch>
        <Route exact path='/' component={banner} />
    </Switch>
);