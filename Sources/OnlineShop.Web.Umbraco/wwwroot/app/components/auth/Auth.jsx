import React, { Component } from 'react'
import Login from '../../containers/auth/login'
import Register from '../../containers/auth/register'

export default class Auth extends Component {
    render() {
        return (
            <article className='g_wrapper auth'>
                <Login />
                <Register />
            </article>
        );
    }
}