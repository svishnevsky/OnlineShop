import React, { Component } from 'react'
import ProductImages from './ProductImages.jsx'
import BlockUi from 'react-block-ui'
import { formatPrice } from '../../utils/common'
import ProductList from './ProductList.jsx'

function loadProduct(props) {
    if (!props.current) {
        return;
    }

    props.loadProduct(props.current);
}

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: {
                description: true,
                relatedProducts: true
            }
        };
        this.toogleActive = this.toogleActive.bind(this);
    }

    componentWillMount() {
        loadProduct(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current !== nextProps.current) {
            loadProduct(nextProps);
        }
    }

    loadProduct(key) {
        this.props.loadProduct(key);
    }

    toogleActive(e, name) {
        e.preventDefault();
        var state = this.state;
        state.active[name] = !state.active[name];
        this.setState(state);
    }

    render() {
        return (
            <BlockUi tag='article' className='g_wrapper' blocking={!this.props.product}>
                {!this.props.product ? <section className='product clearfix' /> :
                    <section className='product clearfix'>
                        <div id='notification'></div>
                        <ProductImages images={this.props.product.images} />

                        <div className='product_info'>
                            <h1>{this.props.product.name}</h1>
                            <span className='vendor-code'>
                                артикул: {this.props.product.sku}
                            </span>
                            <span className='price'>
                                {!this.props.product.onSale ? null : <span className='old'>{formatPrice(this.props.product.price)}</span>}
                                <span className={this.props.product.onSale ? 'now' : null}>{this.props.product.onSale ? formatPrice(this.props.product.salePrice) : formatPrice(this.props.product.price)}</span>
                            </span>
                            <div className='clearfix'></div>
                            <div className='cart'>
                                <div id='product-cart'>
                                    <div className='cart-box'>
                                    </div>
                                </div>
                                <div className='clearfix'></div>
                            </div>
                            <div className={`b_info details min_block ${this.state.active.description ? 'active' : null}`}>
                                <h2>
                                    <a className='black title trigger' onClick={(e) => this.toogleActive(e, 'description')}>Описание</a>
                                    <a className='min_block_trigger trigger' onClick={(e) => this.toogleActive(e, 'description')}>
                                        <i className='ico'></i>
                                    </a>
                                </h2>
                                <div className='content min_block_c'>
                                    <p>
                                        {this.props.product.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {!this.props.product.relatedProducts ? null :
                            <div className={`add_products min_block ${this.state.active.relatedProducts ? 'active' : null}`}>
                                <h2>
                                    <span className='black title trigger' onClick={(e) => this.toogleActive(e, 'relatedProducts')}>Вам так же может быть интересно</span> <span className='min_block_trigger trigger' onClick={(e) => this.toogleActive(e, 'relatedProducts')}><i className='ico'></i></span>
                                </h2>
                                <div className='content min_block_c more_prod'>
                                    <ProductList products={this.props.product.relatedProducts} cropWidth='200' />
                                </div>
                            </div>
                        }

                    </section>
                }
            </BlockUi>
        );
    }
}