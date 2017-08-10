import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ShippingAddress from '../../components/checkout/ShippingAddress.jsx'
import { fetchAddress, updateAddress } from '../../actions/account'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        address: state.account.shipping,
        loading: state.account.shippingLoading
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
        fetchBilling: () => {
            dispatch(fetchAddress('shipping'));
        },
        update: (address) => {
            dispatch(updateAddress(address, 'shipping'));
        }
    }
};

const shipping = connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)
export default shipping;