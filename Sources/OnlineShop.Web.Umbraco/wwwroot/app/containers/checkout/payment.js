import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Payment from '../../components/checkout/Payment.jsx'

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.name && true
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToLogin: () => {
            dispatch(push('/auth'));
        }
    }
};

const payment = connect(mapStateToProps, mapDispatchToProps)(Payment)
export default payment;