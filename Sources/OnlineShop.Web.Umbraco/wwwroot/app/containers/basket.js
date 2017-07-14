import { connect } from 'react-redux'
import Basket from '../components/basket/Basket.jsx'

const mapStateToProps = (state) => {
    return {
        basket: state.basket
    }
}

const basket = connect(mapStateToProps)(Basket)
export default basket;