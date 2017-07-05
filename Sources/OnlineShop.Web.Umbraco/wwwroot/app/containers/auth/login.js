import { connect } from 'react-redux'
import Login from '../../components/auth/Login.jsx'
import { sendLogin } from '../../actions/auth'

const mapStateToProps = (state) => {
    return {
        loading: state.auth.login.loading,
        error: state.auth.login.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => {
            dispatch(sendLogin(username, password));
        }
    }
};

const login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default login;