import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Payment from '../../components/checkout/Payment.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true
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
            console.log(method);
        }
    }
};

const payment = connect(mapStateToProps, mapDispatchToProps)(Payment)
export default payment;