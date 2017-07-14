import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
                    <h1>Условия заказа</h1>
                    <div className={`'b_info details min_block preview ${this.state.active.payment ? 'active' : ''} `}>
                        <h2 onClick={(e) => this.toogleActive(e, 'payment')}>
                            <a className='black title trigger'>УСЛОВИЯ ЗАКАЗА, ОПЛАТЫ И ДОСТАВКИ ТОВАРА</a>
                            <a className='min_block_trigger trigger'><i className='ico'></i></a>
                        </h2>
                        <div className='content min_block_c'>
                            <ol>
                                <li><h3>1. УСЛОВИЯ ЗАКАЗА ТОВАРА:</h3>
                                    <ol>
                                        <li><h4>1.1 ЗАКАЗ НА САЙТЕ.</h4>
                                            <p>
                                                Уважаемые покупатели, для более комфортной работы с сайтом и оформлением заказов Вы можете пройти <Link to='login'>регистрацию.</Link></p>
                                            <p>У каждого товара на нашем сайте есть кнопка «В корзину», нажав которую Вы поместите выбранный товар в корзину для последующей покупки. Прежде чем нажать кнопку «В корзину» Вы сможете выбрать определенные параметры товара: цвет, размер. Выбрав все интересующие Вас товары, Вы сможете просмотреть полный список нажав на соответствующую кнопку «Корзина»  в правом верхнем углу. Там Вы сможете  проверить товар и его количество.  Для совершения покупки нажмите кнопку «Оформить заказ». После выбора условий оплаты и доставки и указания Ваших данных, нажимайте «Оформить заказ» - готово! Мы обязательно перезвоним Вам, чтобы сверить информацию о заказе.
                                            </p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className={`'b_info details min_block preview ${this.state.active.rules ? 'active' : ''} `}>
                        <h2 onClick={(e) => this.toogleActive(e, 'rules')}>
                            <a className='black title trigger'>ПРАВИЛА ПРОДАЖИ ТОВАРОВ В ИНТЕРНЕТ-МАГАЗИНЕ</a>
                            <a className='min_block_trigger trigger'><i className='ico'></i></a>
                        </h2>
                        <div className='content min_block_c'>
                            <p>Продажа товаров в интернет-магазине    «Irene Italiano» BOUTIQUE BIJOUTERIE»    регулируется следующими законодательными актами:</p>
                            <ul>
                                <li>- Гражданский кодекс Республики Беларусь</li>
                                <li>- Закон Республики Беларусь от 09 января 2002 года № 90-3 «О защите прав потребителей»</li>
                                <li>- Постановление совета министров Республики Беларусь 15 января 2009 года № 31 «Об утверждении Правил осуществления розничной торговли по образцам»</li>
                                <li>- Перечень непродовольственных товаров надлежащего качества,  не подлежащих обмену и возврату (Постановление совета министров Республики Беларусь  14 июня 2002 года №778 «О мерах по реализации Закона Республики Беларусь «О защите прав потребителей», в действующей редакции)</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}