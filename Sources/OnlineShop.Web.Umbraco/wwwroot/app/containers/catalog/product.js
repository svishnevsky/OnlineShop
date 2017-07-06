import { connect } from 'react-redux'
import Product from '../../components/catalog/Product.jsx'
import { fetchProduct } from '../../actions/catalog'

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.catalog.productLoading,
        product: state.catalog.product,
        current: !state.catalog.products ? undefined : state.catalog.products.filter(p => p.name === ownProps.match.params.product)[0].key
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProduct: (key) => {
            dispatch(fetchProduct(key));
        }
    }
};

const product = connect(mapStateToProps, mapDispatchToProps)(Product)
export default product;