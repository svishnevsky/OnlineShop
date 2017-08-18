import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <div className='display-block'>
                <nav className='menu_b'>
                    <Link to='/catalog' className='burgundy'>Каталог</Link>
                    <Link to='/info/user-agreement' className='burgundy'>Условия заказа</Link>
                    <Link to='/info/about' className='burgundy'>О нас</Link>
                    {!this.props.username ? <Link to='/auth' className='burgundy'>Войти</Link> : <Link to='/account' className='burgundy'>{this.props.username}</Link>}
                    {!this.props.username ? null : <a className='logout' onClick={this.handleLogout}><img src='/images/logout.svg' /></a>}
                    <Link to='/basket' className='burgundy cart'><i className='ico'></i><span id='qty-total-cart'>{this.props.qty}</span></Link>
                </nav>
            </div>
        );
    }
}