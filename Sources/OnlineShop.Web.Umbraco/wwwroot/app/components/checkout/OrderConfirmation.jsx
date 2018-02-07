import React from 'react'
import { Link } from 'react-router-dom';
import Checkout from './Checkout.jsx'
import { formatPrice, getCropUrl } from '../../utils/common'

export default class OrderConfirmation extends Checkout {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    back(event) {
        event.preventDefault();
        this.props.goBack();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.confirmOrder({
            paymentMethod: this.props.basket.paymentMethod.key,
            shippingMethod: this.props.basket.shippingMethod.key
        });
    }

    componentWillMount() {
        if (!this.props.billing) {
            this.props.fetchBilling();
        }

        if (!this.props.shipping) {
            this.props.fetchShipping();
        }

        if (!this.props.basket.shippingMethod) {
            this.props.goToStep('shipping');
            return;
        }

        if (!this.props.basket.paymentMethod) {
            this.props.goToStep('payment');
            return;
        }
    }

    render() {
        var model = {
            shipping: this.props.shipping || {},
            billing: this.props.billing || {},
            basket: this.props.basket || {},
            paymentMethod: this.props.basket.paymentMethod ? this.props.basket.paymentMethod : {},
            shippingMethod: this.props.basket.shippingMethod ? this.props.basket.shippingMethod : {},
            loading: this.props.loading
        };

        return super.renderContent(this.props.order
            ? this.renderOrder(this.props.order)
            : <div className='simplecheckout-methods-table two'>
                <form className='form checkout' onSubmit={this.handleSubmit}>
                    <div className='method-container half'>
                        <h2>Плательщик:</h2>
                        <p>{model.billing.name}</p>
                        <p>+375 {model.billing.phone}</p>
                        <p>{model.billing.address}</p>
                        <p>{model.billing.postCode}, {model.billing.city}</p>
                        <h3>Способ оплаты:</h3>
                        <p>{model.paymentMethod.name}</p>
                    </div>

                    <div className='method-container half'>
                        <h2>Получатель:</h2>
                        <p>{model.shipping.name}</p>
                        <p>+375 {model.shipping.phone}</p>
                        <p>{model.shipping.address}</p>
                        <p>{model.shipping.postCode}, {model.shipping.city}</p>
                        <h3>Способ доставки:</h3>
                        <p>{model.shippingMethod.name}</p>
                    </div>

                    <div className='clearfix'></div>

                    <table className='products'>
                        <thead>
                            <tr>
                                <td colSpan='2'>Продукт</td>
                                <td>Цена</td>
                                <td>Количество</td>
                            </tr>
                        </thead>
                        <tbody>
                            {model.basket.items.map(item => <tr key={item.key} className='item'>
                                <td>
                                    <Link to={`/catalog/${item.category}/${item.name}`}><img className='pull_left' width='50px' src={getCropUrl(item.image.url, 50)} alt={item.name} /></Link>
                                </td>
                                <td>
                                    <Link to={`/catalog/${item.category}/${item.name}`}>{item.name}</Link>
                                    {!item.options ? null : item.options.map(o =>
                                        <p key={o.name}>{o.name}: {o.value}</p>
                                    )}
                                </td>
                                <td>
                                    {formatPrice(item.price)}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='3'>Итого:</td>
                                <td>{formatPrice(model.basket.totalPrice)}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <a className='g_black back' onClick={this.back.bind(this)}>Назад <i className='ico'></i></a>
                    {!model.basket.items.length ? null : <button className='g_black next'>Подтвердить <i className='ico'></i></button>}
                    <div className='clearfix'></div>
                </form>
            </div>
        );
    }

    renderOrder(order) {
        return (<div>
            <p>Заказ <Link to={`/account/orders/${order.number}`} className='burgundy'>№{order.number}</Link> на сумму {formatPrice(order.total)} {order.status === 'paid' ? ' Оплата при получении.' : null}</p>
            <Link to='/catalog' className='g_black'>Вернуться к покупкам <i className='ico'></i></Link>
        </div>);
    }
}