import React from 'react'
import Checkout from './Checkout.jsx'
import Validation from 'react-validation';

export default class ShippingAddress extends Checkout {
    constructor(props) {
        super(props);
        this.setMethod = this.setMethod.bind(this);
        this.state = {
            method: 'belpost'
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

        this.props.update({
            name: this.form.components.name.state.value,
            phone: this.form.components.phone.state.value,
            city: this.form.components.city.state.value,
            address: this.form.components.address.state.value,
            postCode: this.form.components.postCode.state.value
        });

        this.props.setShippingMethod(this.state.method);
        this.props.goNext();
    }

    back(event) {
        event.preventDefault();
        this.props.goBack();
    }

    componentWillMount() {
        if (!this.props.billing) {
            this.props.fetchBilling();
        }
    }

    render() {
        const user = this.props.address || {};
        const state = {
            name: user.name || '',
            phone: user.phone || '',
            city: user.city || '',
            address: user.address || '',
            postCode: user.postCode || ''
        };

        return super.renderContent(
            <div className='simplecheckout-methods-table two'>
                <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form checkout'>
                    <div className='method-container half'>
                        <label className='label' htmlFor='name'>Имя</label>
                        <Validation.components.Input className='input' id='name' name='name' placeholder='Имя' type='text' value={state.name} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='phone'>Телефон +375 xx xxxxxxx</label>
                        <span className='phone-prefix'>+375</span>
                        <Validation.components.Input containerClassName='phone shipping' className='input' id='phone' name='phone' placeholder='Телефон' type='text' value={state.phone} validations={['required', 'tel']} errorClassName='error' />

                        <label className='label' htmlFor='city'>Город</label>
                        <Validation.components.Input className='input' id='city' name='city' placeholder='Город' type='text' value={state.city} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='address'>Адрес</label>
                        <Validation.components.Input className='input' id='address' name='address' placeholder='Адрес' type='text' value={state.address} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='postCode'>Почтовый индекс</label>
                        <Validation.components.Input className='input' id='postCode' name='postCode' placeholder='Почтовый индекс' type='text' value={state.postCode} validations={['required', 'postCode']} errorClassName='error' />
                    </div>

                    <div className='method-container half'>
                        {this.props.shippingMethods.map((m, i) => <div key={i} className='method'>
                                <input type='radio' name='shippingMethod' value={m.key} id={`method-${m.key}`} checked={this.state.method === m.key} onChange={this.setMethod} />
                                <label htmlFor={`method-${m.key}`} className='title'>
                                    <span>{m.name}</span>
                                    <span className='comment'>{m.term}</span>
                                </label>
                            </div>)}
                    </div>



                    <div className='clearfix'></div>
                    <a className='g_black back' onClick={this.back.bind(this)}>Назад <i className='ico'></i></a>
                    <button className='g_black next'>Далее <i className='ico'></i></button>
                    <div className='clearfix'></div>
                </Validation.components.Form>
            </div>
        );
    }
}