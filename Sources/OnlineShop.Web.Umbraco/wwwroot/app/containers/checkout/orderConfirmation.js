import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import OrderConfirmation from '../../components/checkout/OrderConfirmation.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => {
            dispatch(push('/checkout/payment'));
        }
    }
};

const orderConfirmation = connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)
export default orderConfirmation;