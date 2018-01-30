import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ShippingAddress from '../../components/checkout/ShippingAddress.jsx'
import { fetchAddress, updateAddress } from '../../actions/account'
import { setShippingMethod } from '../../actions/basket'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        address: state.account.shipping,
        loading: state.account.shippingLoading,
        shippingMethods: state.basket.shippingMethods
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToLogin: () => {
            dispatch(push('/auth'));
        },
        goNext: () => {
            dispatch(push('/checkout/payment'));
        },
        goBack: () => {
            dispatch(push('/checkout'));
        },
        fetchBilling: () => {
            dispatch(fetchAddress('shipping'));
        },
        update: (address) => {
            dispatch(updateAddress(address, 'shipping'));
        },
        setShippingMethod: (method) => {
            dispatch(setShippingMethod(method));
        }
    }
};

const shipping = connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)
export default shipping;