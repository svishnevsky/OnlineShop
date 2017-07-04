import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TopMenu from './TopMenu.jsx'

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className='content'>
                    <span className='free_ship_head display-block'>Бесплатная доставка от {this.props.freeMinPrice} Руб.</span>
                    <Link to='/' className='logo'>
                        <img src='/images/logo.png' alt='BALR' />
                    </Link>
                    <TopMenu/>
                </div>
            </header>
        )
    }
}