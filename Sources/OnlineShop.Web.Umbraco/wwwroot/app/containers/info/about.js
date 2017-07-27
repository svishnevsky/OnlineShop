import { connect } from 'react-redux'
import About from '../../components/info/About.jsx'

const mapStateToProps = (state) => {
    return {
        content: state.info.aboutUs
    }
}

const about = connect(mapStateToProps)(About)
export default about;