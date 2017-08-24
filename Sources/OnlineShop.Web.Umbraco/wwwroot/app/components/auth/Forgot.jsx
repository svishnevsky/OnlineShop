import React, { Component } from 'react'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';

export default class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        if (Object.keys(this.form.validateAll()).length > 0) {
            return;
        }

        this.props.restorePassword(this.form.components.username.state.value);
        var state = this.state;
        state.submitted = true;
        this.setState(state);
    }

    render() {
        return (
            <article className='g_wrapper'>
                <section className='account clearfix'>
                    <h1 className='page_h'>Восствновление пароля</h1>
                    {!this.state.submitted ? null : <div className='success'>Новый пароль отправлен вам на почту.</div>}
                    <BlockUi tag='div' className='tab_content' blocking={this.props.loading}>
                        <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)} className='form'>
                            <label className='label' htmlFor='username'>Email</label>
                            <Validation.components.Input className='input' id='username' name='username' placeholder='Email' type='text' value={this.state.email} validations={['required', 'email']} errorClassName='error' />
                            <div className='clear'></div>
                            <button className='g_black'>Восстановить <i className='ico'></i></button>
                        </Validation.components.Form>
                    </BlockUi>
                </section>
            </article>
        );
    }
}