import * as types from '../actions/types';

const shippingMethods = [{
    key: 'belpost',
    name: 'Белпочта',
    term: '2-5 дней'
},
{
    key: 'carrier',
    name: 'Курьер',
    term: '1-3 дня'
}];

const paymentMethods = [{
    key: 'belpost',
    name: 'Наложенный платеж',
    shippingMethods: ['belpost']
},
{
    key: 'card',
    name: 'Банковская карта (Webpay)'
},
{
    key: 'erip',
    name: 'Система "Расчет" (ЕРИП)'
}];

const basket = (state = { items: [], updating: false, shippingMethods, paymentMethods }, action) => {
    switch (action.type) {
        case types.BASKET_UPDATE_REQUESTED:
            return Object.assign({}, state, {
                updating: true
            });
        case types.BASKET_UPDATED:
            return Object.assign({}, state, {
                updating: false,
                items: action.basket.items,
                totalCount: action.basket.totalCount,
                totalPrice: action.basket.totalPrice
            });
        case types.BASKET_SET_SHIPPING_METHOD:
            return Object.assign({}, state, {
                shippingMethod: shippingMethods.filter(m => m.key === action.method)[0]
            });
        case types.BASKET_SET_PAYMENT_METHOD:
            return Object.assign({}, state, {
                paymentMethod: paymentMethods.filter(m => m.key === action.method)[0]
            });
        default:
            return state;
    }
}

export default basket;