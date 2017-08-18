import React from 'react'
import Checkout from './Checkout.jsx'
import Validation from 'react-validation';

export default class Payment extends Checkout {
    constructor(props) {
        super(props);
    }

    render() {
        return super.renderContent(
            <div className='simplecheckout-methods-table two payment'>
                <Validation.components.Form ref={c => { this.form = c }} className='form checkout'>
                    <div className='method-container half'>
                        <div className='method'>
                            <Validation.components.Input type='radio' validations={['required']} name='shipping_method' value='belpost' id='method-belpost' />
                            <img src='/images/payment_visa.png' width='150px'/>
                        </div>
                    </div>

                    <div className='method-container half'>
                        <div className='method'>
                            <Validation.components.Input type='radio' validations={['required']} name='shipping_method' value='belpost' id='method-belpost' />
                            <img src='/images/payment_mastercard.png' width='150px' />
                        </div>
                    </div>

                    <div className='clearfix'></div>
                    
                </Validation.components.Form>
            </div>
        );
    }
}