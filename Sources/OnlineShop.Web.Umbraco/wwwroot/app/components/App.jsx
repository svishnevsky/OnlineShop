import React, { Component } from 'react'
import Header from '../containers/header.js'
import Footer from '../containers/footer.js'
import Routes from '../Routes.jsx'

export default class App extends Component {
    render() {
        return (
            <div className='home'>
                <Header />
                { Routes }
                <div className='wide_bg'></div>
                <Footer />
            </div>
        );
    }
}