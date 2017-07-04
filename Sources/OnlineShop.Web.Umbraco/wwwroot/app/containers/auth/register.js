import { connect } from 'react-redux'
import Register from '../../components/auth/Register.jsx'

const mapStateToProps = (state) => {
    return {
        state
    }
}

const register = connect(mapStateToProps)(Register)
export default register;