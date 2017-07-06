import React, { Component } from 'react'
import ProductImages from './ProductImages.jsx'
import BlockUi from 'react-block-ui'

function loadProduct(props) {
    if (!props.current) {
        return;
    }

    props.loadProduct(props.current);
}

export default class Product extends Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            <article className='g_wrapper'>
                <BlockUi tag='section' className='product clearfix' blocking={!this.props.product}>
                    <div id='notification'></div>
                    {!this.props.product ? null :
                        <ProductImages images={this.props.product.images} />
                    }
                </BlockUi>
            </article>
        );
    }
}