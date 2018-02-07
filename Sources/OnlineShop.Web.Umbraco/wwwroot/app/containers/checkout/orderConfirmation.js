import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchAddress } from '../../actions/account'
import { confirmOrder } from '../../actions/order'
import OrderConfirmation from '../../components/checkout/OrderConfirmation.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        billing: state.account.billing,
        shipping: state.account.shipping,
        basket: state.basket,
        loading: state.order.orderConfirming,
        order: state.order.order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => {
            dispatch(push('/checkout/payment'));
        },
        goToStep: (step) => {
            dispatch(push('/checkout/' + step));
        },
        fetchShipping: () => {
            dispatch(fetchAddress('shipping'));
        },
        fetchBilling: () => {
            dispatch(fetchAddress('billing'));
        },
        confirmOrder: (order) => {
            dispatch(confirmOrder(order));
        },
        goToReceipt: () => {
            dispatch(push('/Receipt'));
        }
    }
};

const orderConfirmation = connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)
export default orderConfirmation;