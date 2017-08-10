import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from './containers/banner'
import auth from './containers/auth/auth'
import catalog from './containers/catalog/catalog'
import product from './containers/catalog/product'
import userAgreement from './containers/info/userAgreement'
import about from './containers/info/about'
import basket from './containers/basket'
import checkout from './containers/checkout/checkout'
import personal from './containers/account/personal'

export default (
    <Switch>
        <Route exact path='/' component={banner} />
        <Route exact path='/auth' component={auth} />
        <Route exact path='/catalog/:name/:product' component={product} />
        <Route exact path='/catalog/:name' component={catalog} />
        <Route exact path='/catalog' component={catalog} />
        <Route exact path='/info/user-agreement' component={userAgreement} />
        <Route exact path='/info/about' component={about} />
        <Route exact path='/basket' component={basket} />
        <Route exact path='/checkout' component={checkout} />
        <Route exact path='/account' component={personal} />
    </Switch>
);