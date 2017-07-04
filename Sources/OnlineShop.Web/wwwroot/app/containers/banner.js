import { connect } from 'react-redux'
import Banner from '../components/Banner.jsx'

const mapStateToProps = (state) => {
  return {
      url: state.banner.url,
      title: state.banner.title
  }
}

const banner = connect(mapStateToProps)(Banner)
export default banner;