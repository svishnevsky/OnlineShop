import React, { Component } from 'react'

export default class Checkout extends Component {
    componentDidMount() {
        if (!this.props.authenticated) {
            this.props.goToLogin();
        }
    }

    render() {
        return (
            <article className='g_wrapper'>
                <section className='checkout clearfix'>
                    <div className='simple-content'>
                        <div className='simplecheckout'>
                            <div className='step-menu clear100'>
                                <span className='simple-step current completed'><i className='step-number'>1</i>Плательщик</span>
                                <span className='simple-step-delimiter'><img src='/images/next_gray.png' /></span>
                                <span className='simple-step'><i className='step-number'>2</i>Адрес доставки</span>
                                <span className='simple-step-delimiter'><img src='/images/next_gray.png' /></span>
                                <span className='simple-step'><i className='step-number'>3</i>Оплата</span>
                                <span className='simple-step-delimiter'><img src='/images/next_gray.png' /></span>
                                <span className='simple-step'><i className='step-number'>4</i>Подтверждение</span>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}