import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

const mapStateToProps = (state) => {
  return {
    freeMinPrice: state.shipment.freeMinPrice
  }
}

const headerContainer = connect(mapStateToProps)(Header)
export default headerContainer;