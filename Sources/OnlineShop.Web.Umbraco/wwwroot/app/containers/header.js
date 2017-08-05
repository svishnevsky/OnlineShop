import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

const mapStateToProps = (state) => {
  return {
    freeMinPrice: state.options.freeMinPrice
  }
}

const header = connect(mapStateToProps)(Header)
export default header;