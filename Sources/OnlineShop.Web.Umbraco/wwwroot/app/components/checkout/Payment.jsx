import React from 'react'
import Checkout from './Checkout.jsx'
import Validation from 'react-validation';

export default class Payment extends Checkout {
    constructor(props) {
        super(props);
        this.setMethod = this.setMethod.bind(this);
        this.state = {
            method: 'erip'
        }
    }

    setMethod(event) {
        this.setState({
            method: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (Object.keys(this.form.validateAll()).length > 0) {
            return;
        }

        this.props.setPaymentMethod(this.state.method);
        this.props.goNext();
    }

    back(event) {
        event.preventDefault();
        this.props.goBack();
    }

    componentWillMount() {
        if (!this.props.shippingMethod) {
            this.props.goBack();
            return;
        }
    }

    render() {
        return super.renderContent(
            <div className='simplecheckout-methods-table two payment'>
                <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form checkout'>

                    {this.props.paymentMethods.map((m, i) => <div key={i} className='method-container'>
                        <div className='method'>
                            <input type='radio' name='paymentMethod' value={m.key} id={`method-${m.key}`} checked={this.state.method === m.key} onChange={this.setMethod} />
                            <label htmlFor={`method-${m.key}`} className='title'>
                                <span>{m.name}</span>
                            </label>
                        </div>
                    </div>)}

                    <div className='clearfix'></div>
                    <a className='g_black back' onClick={this.back.bind(this)}>Назад <i className='ico'></i></a>
                    <button className='g_black next'>Далее <i className='ico'></i></button>
                    <div className='clearfix'></div>

                </Validation.components.Form>
            </div>
        );
    }
}