import React, { Component } from 'react'
import Login from '../../containers/auth/login'
import Register from '../../containers/auth/register'

function checkLogin(props) {
    if (props.authenticated) {
        if (props.history.length > 2) {
            props.history.goBack(-2);
        } else {
            props.history.push('/');
        }
    }
}

export default class Auth extends Component {
    constructor(props) {
        super(props)
        checkLogin(props);
    }

    componentWillReceiveProps(props) {
        checkLogin(props);
    }

    render() {
        return (
            <article className='g_wrapper auth'>
                <Login />
                <Register />
            </article>
        );
    }
}