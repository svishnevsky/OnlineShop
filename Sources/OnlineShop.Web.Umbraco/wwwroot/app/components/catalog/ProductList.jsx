import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, getCropUrl } from '../../utils/common'

export default class ProductList extends Component {
    render() {
        if (!this.props.products) {
            return null;
        }

        return (
            <ul className='products'>
                {this.props.products.map(p => <li key={p.key}>
                    <Link to={this.props.catalog ? `/catalog/${this.props.catalog}/${p.name}` : `/catalog/${p.categories[0].name}/${p.name}`}>
                        <img alt={p.images[0].name} className='pull_left lazy' height={`${this.props.cropHeight || this.props.cropWidth}px`} width={`${this.props.cropWidth}px`} src={getCropUrl(p.images[0].url, this.props.cropWidth, this.props.cropHeight || this.props.cropWidth)} />
                        <span>{p.name}</span>
                        <span>{formatPrice(p.price)}</span>
                    </Link>
                    <div className='clearfix'></div>
                </li>)}
            </ul>
        );
    }
}