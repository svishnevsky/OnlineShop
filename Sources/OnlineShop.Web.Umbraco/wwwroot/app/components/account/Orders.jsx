import React from 'react'
import { formatPrice } from '../../utils/common'
import Account from './Account.jsx'

const statusMap = {
    paid: 'Оплачен',
    unpaid: 'Не оплачен',
    cancelled: 'Отменен',
};

export default class Orders extends Account {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.orders) {
            this.props.fetchOrders();
        }
    }

    render() {
        var orders = this.props.orders || [];
        return super.renderContent(
            <table className='orders'>
                <thead>
                    <tr>
                        <td>№</td>
                        <td>Дата</td>
                        <td>Статус</td>
                        <td>Сумма</td>
                        <td>Товары</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(item => <tr key={item.number} className='item'>
                        <td>
                            {item.number}
                        </td>
                        <td>
                            {item.date}
                        </td>
                        <td>
                            {statusMap[item.status]}
                        </td>
                        <td>
                            {formatPrice(item.total)}
                        </td>
                        <td>
                            <ul>
                                {item.items.map(x => <li key={x.key}>{x.name} {x.quantity}шт.</li>)}
                                </ul>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        );
    }
}