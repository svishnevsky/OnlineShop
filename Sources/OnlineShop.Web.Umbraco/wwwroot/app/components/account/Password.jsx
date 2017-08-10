import React from 'react'
import Account from './Account.jsx'
import Validation from 'react-validation';

export default class Password extends Account {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.changePassword(this.form.components.password.state.value);
    }

    render() {
        return super.renderContent(
            <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form'>
                <label className='label' htmlFor='password'>Новый пароль</label>
                <Validation.components.Input className='input' id='password' name='password' placeholder='Пароль' type='password' value='' validations={['required', 'password']} errorClassName='error' />

                <Validation.components.Button className='g_black'>Сохранить <i className='ico'></i></Validation.components.Button>
            </Validation.components.Form>
        );
    }
}