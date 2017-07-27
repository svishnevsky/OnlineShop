import { connect } from 'react-redux'
import UserAgreement from '../../components/info/UserAgreement.jsx'

const mapStateToProps = (state) => {
    return {
        orderConditions: state.info.orderConditions,
        salesRules: state.info.salesRules
    }
}

const userAgreement = connect(mapStateToProps)(UserAgreement)
export default userAgreement;