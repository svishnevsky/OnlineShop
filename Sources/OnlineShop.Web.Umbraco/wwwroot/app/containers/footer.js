import { connect } from 'react-redux'
import Footer from '../components/Footer.jsx'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const footer = connect(mapStateToProps)(Footer)
export default footer;