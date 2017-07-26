import { connect } from 'react-redux'
import Basket from '../components/basket/Basket.jsx'
import { changeQty, removeItem } from '../actions/basket'

const mapStateToProps = (state) => {
    return {
        basket: state.basket
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeQty: (key, qty) => {
            dispatch(changeQty(key, qty));
        },
        removeItem: (key) => {
            dispatch(removeItem(key));
        }
    }
};

const basket = connect(mapStateToProps, mapDispatchToProps)(Basket)
export default basket;