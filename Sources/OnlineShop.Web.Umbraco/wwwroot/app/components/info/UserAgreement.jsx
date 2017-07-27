import React, { Component } from 'react'

export default class UserAgreement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: {
                payment: false,
                rules: false
            }
        };
    }

    toogleActive(e, name) {
        e.preventDefault();
        let state = this.state;
        state.active[name] = !state.active[name];
        this.setState(state);
    }

    render() {
        return (
            <article className='g_wrapper'>
                <section className='blog clearfix blog_cat'>
                    <h1>Пользовательское соглашение</h1>
                    <div className={`'b_info details min_block preview ${this.state.active.payment ? 'active' : ''} `}>
                        <h2 onClick={(e) => this.toogleActive(e, 'payment')}>
                            <a className='black title trigger'>УСЛОВИЯ ЗАКАЗА, ОПЛАТЫ И ДОСТАВКИ ТОВАРА</a>
                            <a className='min_block_trigger trigger'><i className='ico'></i></a>
                        </h2>
                        <div className='content min_block_c' dangerouslySetInnerHTML={{ __html: this.props.orderConditions }} />
                    </div>
                    <div className={`'b_info details min_block preview ${this.state.active.rules ? 'active' : ''} `}>
                        <h2 onClick={(e) => this.toogleActive(e, 'rules')}>
                            <a className='black title trigger'>ПРАВИЛА ПРОДАЖИ ТОВАРОВ В ИНТЕРНЕТ-МАГАЗИНЕ «Irene Italiano» BOUTIQUE BIJOUTERIE»</a>
                            <a className='min_block_trigger trigger'><i className='ico'></i></a>
                        </h2>
                        <div className='content min_block_c' dangerouslySetInnerHTML={{ __html: this.props.salesRules }} />
                    </div>
                </section>
            </article>
        );
    }
}