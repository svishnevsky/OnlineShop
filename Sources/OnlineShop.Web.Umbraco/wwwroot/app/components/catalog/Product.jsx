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

function getChoices(product, name) {
    let choices = product && product.options ? product.options.filter(o => o.name === name) : undefined;
    if (!choices || choices.length === 0) {
        return null;
    }

    return choices[0].choices;
}

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: {
                description: true,
                relatedProducts: true
            },
            selected: {}
        };
    }

    componentWillMount() {
        loadProduct(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current !== nextProps.current) {
            loadProduct(nextProps);
            let state = this.state;
            state.selected = {};
            state.variant = undefined;
            this.setState(state);
        }
    }

    loadProduct(key) {
        this.props.loadProduct(key);
    }

    toogleActive(e, name) {
        e.preventDefault();
        let state = this.state;
        state.active[name] = !state.active[name];
        this.setState(state);
    }

    selectOption(name, value) {
        let state = this.state;
        state.selected[name] = value;
        if (this.props.product.options.length === Object.getOwnPropertyNames(state.selected).length) {
            state.variant = this.props.product.variants.filter(v => this.props.product.options.filter(o => v.options[o.name].sku === state.selected[o.name]).length === this.props.product.options.length)[0];
        } else {
            state.variant = null;
        }

        this.setState(state);
    }

    sizeAvaiable(sku) {
        const variant = this.props.product.variants.filter(v => (!v.trackCount || v.count > 0) && v.options.size.sku === sku && (!this.state.selected.color || !v.options.color || this.state.selected.color === v.options.color.sku));
        return variant && variant.length > 0;
    }

    colorAvaiable(sku) {
        const variant = this.props.product.variants.filter(v => (!v.trackCount || v.count > 0) && v.options.color.sku === sku && (!this.state.selected.size || !v.options.size || this.state.selected.size === v.options.size.sku));
        return variant && variant.length > 0;
    }

    render() {
        const sizes = getChoices(this.props.product, 'size');
        const colors = getChoices(this.props.product, 'color');

        const selectedVariant = this.state.variant || this.props.product;

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
                                {!selectedVariant.onSale ? null : <span className='old'>{formatPrice(selectedVariant.price)}</span>}
                                <span className={selectedVariant.onSale ? 'now' : null}>{selectedVariant.onSale ? formatPrice(selectedVariant.salePrice) : formatPrice(selectedVariant.price)}</span>
                            </span>

                            {!sizes ? null :
                                <div className='b_info details'>
                                    <h2>Размер:</h2>
                                    <ul className='choice size'>
                                        {sizes.filter(size => this.sizeAvaiable(size.sku))
                                            .map(size =>
                                                <li key={size.sku}
                                                    className={`g_black ${this.state.selected.size === size.sku ? 'selected' : null}`}
                                                    onClick={() => this.selectOption('size', size.sku)}>{size.name}</li>)}
                                    </ul>
                                    <div className='clearfix'></div>
                                </div>
                            }

                            {!colors ? null :
                                <div className='b_info details'>
                                    <h2>Цвет:</h2>
                                    <ul className='choice color'>
                                        {colors.filter(color => this.colorAvaiable(color.sku))
                                            .map(color =>
                                                <li key={color.sku}
                                                    style={{ backgroundColor: `#${color.sku}` }}
                                                    className={`${this.state.selected.color === color.sku ? 'selected' : null}`}
                                                    onClick={() => this.selectOption('color', color.sku)}
                                                    alt={color.name}></li>)}
                                    </ul>
                                    <div className='clearfix'></div>
                                </div>
                            }

                            <div className='clearfix'></div>
                            <div className='cart'>
                                {!this.state.variant ? null :
                                    <button id='button-cart' className='buy_btn g_black add-to-cart-event' onClick={() => this.props.addToCart(this.state.variant.key)}>В корзину <i className='ico'></i></button>
                                }
                            </div>

                            {!this.props.product.description ? null :
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
                            }
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