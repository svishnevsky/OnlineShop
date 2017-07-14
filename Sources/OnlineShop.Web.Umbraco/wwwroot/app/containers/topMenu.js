import { connect } from 'react-redux'
import TopMenu from '../components/TopMenu.jsx'

const mapStateToProps = (state) => {
    return {
        username: state.auth.name,
        qty: state.basket.totalCount
    }
}

const topMenu = connect(mapStateToProps)(TopMenu)
export default topMenu;