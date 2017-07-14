import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/common'
import BasketItem from './BasketItem.jsx'

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: props.basket.totalPrice
        }

        this.addToTotal = this.addToTotal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.basket.totalPrice === this.props.basket.totalPrice) {
            return;
        }

        let state = this.state;
        state.totalPrice = nextProps.basket.totalPrice;
        this.setState(state);
    }

    addToTotal(amount) {
        let state = this.state;
        state.totalPrice += amount;
        this.setState(state);
    }

    render() {
        return (
            <article className='g_wrapper'>
                {!this.props.basket.items || this.props.basket.items.length === 0 ?
                    <section className='terms clearfix errorPage'>
                        <h1>Ваша корзина пуста.</h1>
                        <Link to='/catalog' className='g_black'>Продолжить покупки <i className='ico'></i></Link>
                        <div className='clearfix'></div>
                    </section>
                    : <section className='bag clearfix'>
                        <h1 className='page_h'>Корзина</h1>
                        <div className='shopping_bag'>
                            <div className='products'>
                                <div className='legend'>
                                    <div className='col col1'><h3>Продукт</h3></div>
                                    <div className='col col2'><h3>Цена</h3></div>
                                    <div className='col col3'><h3>Количество</h3></div>
                                    <div className='col col4'><h3></h3></div>
                                    <div className='col col5'></div>
                                </div>
                                <div className='items'>
                                    {this.props.basket.items.map(item => <BasketItem key={item.key} item={item} addToTotal={this.addToTotal} />)}
                                </div>
                            </div>
                            <div className='total'>
                                <div className='legend'>
                                    <div className='col col_w'><h3>Сумма заказа</h3></div>
                                </div>
                                <div className='table'>
                                    <div className='row'>
                                        <span><b>Всего</b>: {formatPrice(this.state.totalPrice)}</span>
                                    </div>
                                </div>
                                <div className='table grand'>
                                    <div className='row'>
                                        <a href='/checkout' className='g_black checkout button'>
                                            Оформить заказ<i className='ico'></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='clearfix'>
                            <hr className='checkout' />
                            <Link to='/catalog' className='go_back'>Вернуться к покупкам</Link>
                        </div>
                    </section>
                }
            </article>
        )
    }
}