import { connect } from 'react-redux'
import Auth from '../../components/auth/Auth.jsx'

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.name && true
    }
}

const auth = connect(mapStateToProps)(Auth)
export default auth;