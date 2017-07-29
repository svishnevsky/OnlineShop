import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Checkout from '../../components/checkout/Checkout.jsx'

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

const checkout = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default checkout;