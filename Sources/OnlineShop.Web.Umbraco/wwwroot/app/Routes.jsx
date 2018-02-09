import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from './containers/banner'
import auth from './containers/auth/auth'
import forgot from './containers/auth/forgot'
import catalog from './containers/catalog/catalog'
import product from './containers/catalog/product'
import userAgreement from './containers/info/userAgreement'
import about from './containers/info/about'
import basket from './containers/basket'
import billing from './containers/checkout/billing'
import shipping from './containers/checkout/shipping'
import payment from './containers/checkout/payment'
import orderConfirmation from './containers/checkout/orderConfirmation'
import personal from './containers/account/personal'
import password from './containers/account/password'
import orders from './containers/account/orders'

export default (
    <Switch>
        <Route exact path='/' component={banner} />
        <Route exact path='/auth' component={auth} />
        <Route exact path='/auth/forgot-password' component={forgot} />
        <Route exact path='/catalog/:name/:product' component={product} />
        <Route exact path='/catalog/:name' component={catalog} />
        <Route exact path='/catalog' component={catalog} />
        <Route exact path='/info/user-agreement' component={userAgreement} />
        <Route exact path='/info/about' component={about} />
        <Route exact path='/basket' component={basket} />
        <Route exact path='/checkout' component={billing} />
        <Route exact path='/checkout/shipping' component={shipping} />
        <Route exact path='/checkout/payment' component={payment} />
        <Route exact path='/checkout/confirmation' component={orderConfirmation} />
        <Route exact path='/account' component={personal} />
        <Route exact path='/account/password' component={password} />
        <Route exact path='/account/orders' component={orders} />
    </Switch>
);