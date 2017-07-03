import React, { Component } from 'react'
import HeaderContainer from '../containers/HeaderContainer.js'
import Footer from './Footer.jsx'

export default class App extends Component {
    render() {
        return (
            <div className='home'>
                <HeaderContainer />
                {this.props.children}
                <div className='wide_bg' />
                <Footer />
            </div>
        );
    }
}