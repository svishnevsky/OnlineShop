import { connect } from 'react-redux'
import Product from '../../components/catalog/Product.jsx'
import { fetchProduct } from '../../actions/catalog'
import { addToBasket } from '../../actions/basket'

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.catalog.productLoading,
        product: state.catalog.product,
        current: !state.catalog.products ? undefined : state.catalog.products.filter(p => p.name === ownProps.match.params.product)[0].key,
        updating: state.basket.updating
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProduct: (key) => {
            dispatch(fetchProduct(key));
        },
        addToCart: (product) => {
            dispatch(addToBasket(product));
        }
    }
};

const product = connect(mapStateToProps, mapDispatchToProps)(Product)
export default product;