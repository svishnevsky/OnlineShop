import React, { Component } from 'react'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email || '',
            password: props.password || ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        if (Object.keys(this.form.validateAll()).length > 0) {
            return;
        }

        this.props.login(this.form.components.username.state.value, this.form.components.password.state.value);
    }

    render() {
        return (
            <section className='account clearfix'>
                <h1 className='page_h'>Авторизация</h1>
                {!this.props.error ? null : <div className='warning'>Пользователь с таким e-mail адресом не существует или неверный пароль.</div>}
                <BlockUi tag='div' className='tab_content' blocking={this.props.loading}>
                    <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form'>
                        <label className='label' htmlFor='username'>Email</label>
                        <Validation.components.Input className='input' id='username' name='username' placeholder='Email' type='text' value={this.state.email} validations={['required', 'email']} errorClassName='error' />
                        <label className='label' htmlFor='password'>Пароль</label>
                        <Validation.components.Input className='input' id='password' name='password' placeholder='Пароль' type='password' value={this.state.password} validations={['required', 'password']} errorClassName='error' />
                        <div className='clear'></div>
                        <button className='g_black'>Войти <i className='ico'></i></button>
                        <div className='informer'>
                            <a href='/forgot-password'>Забыли пароль?</a>
                        </div>
                    </Validation.components.Form>
                </BlockUi>
            </section>
        );
    }
}