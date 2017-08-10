import { connect } from 'react-redux'
import Personal from '../../components/account/Personal.jsx'
import { logout } from '../../actions/auth'
import { fetchAddress, updateAddress } from '../../actions/account'
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        address: state.account.billing,
        loading: state.account.billingLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        },
        goToLogin: () => {
            dispatch(push('/auth'));
        },
        fetchPeronal: () => {
            dispatch(fetchAddress('billing'));
        },
        update: (address) => {
            dispatch(updateAddress(address, 'billing'));
        }
    }
};

const personal = connect(mapStateToProps, mapDispatchToProps)(Personal)
export default personal;