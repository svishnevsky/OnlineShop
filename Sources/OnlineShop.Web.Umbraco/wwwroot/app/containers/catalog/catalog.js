import { connect } from 'react-redux'
import Catalog from '../../components/catalog/Catalog.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.catalog.categories,
        active: ownProps.match.params.name,
        products: !state.catalog.products
            ? undefined
            : !ownProps.match.params.name ? state.catalog.products : state.catalog.products.filter(p => p.categories.filter(c => c.name === ownProps.match.params.name).length)
    }
}

const catalog = connect(mapStateToProps)(Catalog)
export default catalog;