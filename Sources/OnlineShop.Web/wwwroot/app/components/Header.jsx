import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className='g_wrapper'>
                <div className='content'>
                    <span className='free_ship_head display-block'>Бесплатная доставка от {this.props.freeMinPrice} Руб.</span>
                    <Link to='/' className='logo'>
                        <img src='/images/logo.png' alt='BALR' />
                    </Link>
                </div>
            </header>
        )
    }
}