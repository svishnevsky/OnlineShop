import React, { Component } from 'react'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email || '',
            password: props.password || '',
            name: props.name || '',
            lastName: props.lastName || ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.register({
            firstName: this.form.components.regName.state.value,
            lastName: this.form.components.regLastName.state.value,
            email: this.form.components.regEmail.state.value,
            password: this.form.components.regPassword.state.value
        });
    }

    render() {
        return (
            <section className='account clearfix'>
                <h1 className='page_h'>Регистрация</h1>
                {!this.props.errors ? null : this.props.errors.map((item, index) => <div key={index} className='warning'>{item}</div>)}
                <BlockUi tag='div' className='tab_content' blocking={this.props.loading}>
                    <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form'>
                        <label className='label' htmlFor='regName'>Имя</label>
                        <Validation.components.Input className='input' id='regName' name='regName' placeholder='Имя' type='text' value={this.state.name} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='regLastName'>Фамилия</label>
                        <Validation.components.Input className='input' id='regLastName' name='regLastName' placeholder='Фамилия' type='text' value={this.state.lastName} validations={['required']} errorClassName='error' />

                        <label className='label' htmlFor='regEmail'>Email</label>
                        <Validation.components.Input className='input' id='regEmail' name='regEmail' placeholder='Email' type='text' value={this.state.email} validations={['required', 'email']} errorClassName='error' />

                        <label className='label' htmlFor='regPassword'>Пароль</label>
                        <Validation.components.Input className='input' id='regPassword' name='regPassword' placeholder='Пароль' type='password' value={this.state.password} validations={['required', 'password']} errorClassName='error' />
                        <div className='clear'></div>

                        <Validation.components.Button className='g_black'>Регистрация <i className='ico'></i></Validation.components.Button>
                    </Validation.components.Form>
                </BlockUi>
                <div className='clearfix'/>
            </section>
        );
    }
}