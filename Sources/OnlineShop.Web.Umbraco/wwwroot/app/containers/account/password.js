import { connect } from 'react-redux'
import Password from '../../components/account/Password.jsx'
import { logout } from '../../actions/auth'
import { changePassword } from '../../actions/account'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.name && true,
        loading: state.account.passwordLoading
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
        changePassword: (password) => {
            dispatch(changePassword(password));
        }
    }
};

const password = connect(mapStateToProps, mapDispatchToProps)(Password)
export default password;