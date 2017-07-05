import { connect } from 'react-redux'
import TopMenu from '../components/TopMenu.jsx'

const mapStateToProps = (state) => {
    return {
        username: state.auth.name
    }
}

const topMenu = connect(mapStateToProps)(TopMenu)
export default topMenu;