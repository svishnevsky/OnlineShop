import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from './containers/banner'
import auth from './containers/auth/auth'
import catalog from './containers/catalog/catalog'
import product from './containers/catalog/product'
import UserAgreement from './components/info/UserAgreement.jsx'
import About from './components/info/About.jsx'

export default (
    <Switch>
        <Route exact path='/' component={banner} />
        <Route exact path='/auth' component={auth} />
        <Route exact path='/catalog/:name/:product' component={product} />
        <Route exact path='/catalog/:name' component={catalog} />
        <Route exact path='/catalog' component={catalog} />
        <Route exact path='/info/user-agreement' component={UserAgreement} />
        <Route exact path='/info/about' component={About} />
    </Switch>
);