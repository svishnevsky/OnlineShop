import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui'
import { formatPrice } from '../../utils/common'
import BasketItem from './BasketItem.jsx'

export default class Basket extends Component {
    render() {
        const basket = this.props.basket;
        return (
            <article className='g_wrapper'>
                {!basket.items || basket.items.length === 0 ?
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
                                <BlockUi tag='div' className='items' blocking={basket.updating}>
                                    {basket.items.map(item => <BasketItem key={item.key} item={item} changeQty={this.props.changeQty} removeItem={this.props.removeItem} />)}
                                </BlockUi>
                            </div>
                            <div className='total'>
                                <div className='legend'>
                                    <div className='col col_w'><h3>Сумма заказа</h3></div>
                                </div>
                                <div className='table'>
                                    <div className='row'>
                                        <span><b>Всего</b>: {formatPrice(basket.totalPrice)}</span>
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