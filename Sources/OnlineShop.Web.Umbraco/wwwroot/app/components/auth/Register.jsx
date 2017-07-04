import React, { Component } from 'react'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email || '',
            password: props.password || ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.controller.save({
            name: this.form.components.name.state.value,
            description: this.form.components.description.state.value
        });
    }

    render() {
        return (
            <section className='account clearfix'>
                <h1 className='page_h'>Регистрация</h1>
                <BlockUi tag='div' className='tab_content' blocking={this.props.loading}>
                    <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form'>
                        <label className='label' htmlFor='reg-name'>Имя</label>
                        <Validation.components.Input className='input' id='reg-name' name='reg-name' placeholder='Имя' type='text' value={this.state.name} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='reg-lastName'>Фамилия</label>
                        <Validation.components.Input className='input' id='reg-lastName' name='reg-lastName' placeholder='Фамилия' type='text' value={this.state.lastName} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='reg-username'>Email</label>
                        <Validation.components.Input className='input' id='reg-username' name='reg-username' placeholder='Email' type='text' value={this.state.email} validations={['required', 'email']} errorClassName='error' />

                        <label className='label' htmlFor='reg-password'>Пароль</label>
                        <Validation.components.Input className='input' id='reg-password' name='reg-password' placeholder='Пароль' type='password' value={this.state.password} validations={['required', 'password']} errorClassName='error' />
                        <div className='clear'></div>

                        <button className='g_black'>Регистрация <i className='ico'></i></button>
                    </Validation.components.Form>
                </BlockUi>
                <div className='clearfix'/>
            </section>
        );
    }
}