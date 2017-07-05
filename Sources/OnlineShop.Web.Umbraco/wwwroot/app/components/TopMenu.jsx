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
                    {!this.props.username ? <Link to='/auth' className='burgundy'>Войти</Link> : <Link to='/account' className='burgundy'>{this.props.username}</Link>}
                    <Link to='/cart' className='burgundy cart'><i className='ico'></i><span id='qty-total-cart'>{this.props.qty}</span></Link>
                </nav>
            </div>
        );
    }
}