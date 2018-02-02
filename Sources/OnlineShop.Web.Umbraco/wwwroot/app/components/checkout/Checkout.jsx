import React, { Component } from 'react'
import BlockUi from 'react-block-ui'

const steps = [
    { type: 'step', number: 1, path: '/checkout', title: 'Плательщик', name: 'Информация о плательщике' },
    { type: 'delimiter'},
    { type: 'step', number: 2, path: '/checkout/shipping', title: 'Доставка', name: 'Адрес и способ доставки' },
    { type: 'delimiter'},
    { type: 'step', number: 3, path: '/checkout/payment', title: 'Оплата', name: 'Споб оплаты' },
    { type: 'delimiter'},
    { type: 'step', number: 4, path: '/checkout/confirmation', title: 'Подтверждение', name: 'Подтверждение покупки' }
];

export default class Checkout extends Component {
    componentDidMount() {
        if (!this.props.authenticated) {
            this.props.goToLogin();
        }
    }

    componentWillReceiveProps(next) {
        if (!next.authenticated) {
            this.props.goToLogin();
        }
    }

    renderContent(content) {
        const current = steps.filter(s => s.path === this.props.path)[0];
        return (
            <article className='g_wrapper'>
                <section className='checkout account clearfix'>
                    <div className='simple-content'>
                        <div className='simplecheckout'>

                            <div className='step-menu clear100'>
                                {steps.map((s, i) => s.type === 'step'
                                    ? <span key={s.path} className={`simple-step ${current.number === s.number ? 'current' : ''} ${current.number >= s.number ? 'completed' : ''}`}><i className='step-number'>{s.number}</i>{s.title}</span>
                                    : <span key={i} className='simple-step-delimiter'><img src='/images/next_gray.png' alt='>' /></span>)}
                            </div>
                            <h1 className='page_h'>{current.name}</h1>
                            <div className='clearfix' />
                            <BlockUi tag='div' className='tab_content' blocking={this.props.loading}>
                                {content}
                            </BlockUi>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}