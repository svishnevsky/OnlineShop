import { connect } from 'react-redux'
import Orders from '../../components/account/Orders.jsx'
import { logout } from '../../actions/auth'
import { push } from 'react-router-redux'
import { fetchOrders } from '../../actions/order'

const mapStateToProps = (state, ownProps) => {
    return {
        path: ownProps.match.url,
        authenticated: state.auth.name && true,
        loading: state.order.ordersLoading,
        orders: state.order.orders
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        },
        goToLogin: () => {
            dispatch(push('/auth'));
        },
        fetchOrders: () => {
            dispatch(fetchOrders());
        }
    }
};

const orders = connect(mapStateToProps, mapDispatchToProps)(Orders)
export default orders;