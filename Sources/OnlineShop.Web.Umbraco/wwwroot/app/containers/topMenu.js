import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import TopMenu from '../components/TopMenu.jsx'

const mapStateToProps = (state) => {
    return {
        username: state.auth.name,
        qty: state.basket.totalCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
};

const topMenu = connect(mapStateToProps, mapDispatchToProps)(TopMenu)
export default topMenu;