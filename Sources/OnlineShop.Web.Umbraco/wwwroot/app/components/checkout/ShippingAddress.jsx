import React from 'react'
import Checkout from './Checkout.jsx'
import Validation from 'react-validation';

export default class ShippingAddress extends Checkout {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.update({
            name: this.form.components.name.state.value,
            phone: this.form.components.phone.state.value,
            city: this.form.components.city.state.value,
            address: this.form.components.address.state.value,
            postCode: this.form.components.postCode.state.value
        });

        this.props.goNext();
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
                        <Validation.components.Input className='input' id='phone' name='phone' placeholder='Телефон' type='text' value={state.phone} validations={['required', 'tel']} errorClassName='error' />

                        <label className='label' htmlFor='city'>Город</label>
                        <Validation.components.Input className='input' id='city' name='city' placeholder='Город' type='text' value={state.city} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='address'>Адрес</label>
                        <Validation.components.Input className='input' id='address' name='address' placeholder='Адрес' type='text' value={state.address} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='postCode'>Почтовый индекс</label>
                        <Validation.components.Input className='input' id='postCode' name='postCode' placeholder='Почтовый индекс' type='text' value={state.postCode} validations={['required', 'postCode']} errorClassName='error' />
                    </div>

                    <div className='method-container half'>
                        <div className='method'>
                            <Validation.components.Input type='radio' validations={['required']} name='shipping_method' value='belpost' id='method-belpost' />
                            <label htmlFor='method-belpost' className='title'>
                                <span>Белпочта</span>
                                <span className='comment'>2-5 дней</span>
                            </label>
                        </div>

                        <div className='method'>
                            <Validation.components.Input type='radio' validations={['required']} name='shipping_method' checked='checked' value='carier' id='method-carier' />
                            <label htmlFor='method-carier' className='title'>
                                <span>Курьер</span>
                                <span className='comment'>2-3 дня</span>
                            </label>
                        </div>
                    </div>

                    <div className='clearfix'></div>
                    <Validation.components.Button className='g_black'>Далее <i className='ico'></i></Validation.components.Button>
                </Validation.components.Form>
            </div>
        );
    }
}