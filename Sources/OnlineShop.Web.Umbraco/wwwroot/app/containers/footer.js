import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import Footer from '../components/Footer.jsx'

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.name && true
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
};

const footer = connect(mapStateToProps, mapDispatchToProps)(Footer)
export default footer;