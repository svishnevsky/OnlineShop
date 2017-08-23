import { connect } from 'react-redux'
import Forgot from '../../components/auth/Forgot.jsx'
import { restorePassword } from '../../actions/auth'

const mapDispatchToProps = (dispatch) => {
    return {
        restorePassword: (username) => {
            dispatch(restorePassword(username));
        }
    }
};

const forgot = connect(null, mapDispatchToProps)(Forgot)
export default forgot;