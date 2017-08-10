import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import BillingAddress from '../../components/checkout/BillingAddress.jsx'
import { fetchAddress, updateAddress } from '../../actions/account'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        address: state.account.billing,
        loading: state.account.billingLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToLogin: () => {
            dispatch(push('/auth'));
        },
        goNext: () => {
            dispatch(push('/checkout/shipping'));
        },
        fetchBilling: () => {
            dispatch(fetchAddress('billing'));
        },
        update: (address) => {
            dispatch(updateAddress(address, 'billing'));
        }
    }
};

const billing = connect(mapStateToProps, mapDispatchToProps)(BillingAddress)
export default billing;