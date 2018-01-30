import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Payment from '../../components/checkout/Payment.jsx'
import { setPaymentMethod } from '../../actions/basket'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        paymentMethods: state.basket.shippingMethod ? state.basket.paymentMethods.filter(m => !m.shippingMethods || m.shippingMethods.filter(x => x === state.basket.shippingMethod.key).length > 0) : [],
        shippingMethod: state.basket.shippingMethod
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToLogin: () => {
            dispatch(push('/auth'));
        },
        goNext: () => {
            dispatch(push('/checkout/confirmation'));
        },
        goBack: () => {
            dispatch(push('/checkout/shipping'));
        },
        setPaymentMethod: (method) => {
            dispatch(setPaymentMethod(method));
        }
    }
};

const payment = connect(mapStateToProps, mapDispatchToProps)(Payment)
export default payment;