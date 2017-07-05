import { connect } from 'react-redux'
import Register from '../../components/auth/Register.jsx'
import { sendRegister } from '../../actions/auth'

const mapStateToProps = (state) => {
    return {
        loading: state.auth.register.loading,
        errors: state.auth.register.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => {
            dispatch(sendRegister(user));
        }
    }
};

const register = connect(mapStateToProps, mapDispatchToProps)(Register)
export default register;