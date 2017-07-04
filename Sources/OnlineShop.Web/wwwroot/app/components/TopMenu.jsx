import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class TopMenu extends Component {
    render() {
        return (
            <div className='display-block'>
                <nav className='menu_b'>
                    <Link to='/catalog' className='burgundy'>Каталог</Link>
                    <Link to='/help/order' className='burgundy'>Условия заказа</Link>
                    <Link to='/about' className='burgundy'>О нас</Link>
                    {!this.props.user ? <Link to='/login' className='burgundy'>Войти</Link> : <Link to='/logout' className='burgundy'>this.props.user.name</Link>}
                    <Link to='/cart' className='burgundy cart'><i className='ico'></i><span id='qty-total-cart'>{this.props.qty}</span></Link>
                </nav>
            </div>
        );
    }
}