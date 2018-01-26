import React from 'react'
import Checkout from './Checkout.jsx'

export default class OrderConfirmation extends Checkout {
    constructor(props) {
        super(props);
    }

    back(event) {
        event.preventDefault();
        this.props.goBack();
    }

    render() {
        return super.renderContent(
            <div className='simplecheckout-methods-table two'>
                <a className='g_black back' onClick={this.back.bind(this)}>Назад <i className='ico'></i></a>
            </div>
        );
    }
}