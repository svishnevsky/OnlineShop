import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { formatPrice, getCropUrl } from '../../utils/common'

export default class BasketItem extends Component {
    changeQty(e) {
        e.preventDefault();
        const newQty = new Number(e.target.value);
        this.props.changeQty(this.props.item.key, newQty);
    }

    remove(e) {
        e.preventDefault();
        this.props.removeItem(this.props.item.key);
    }

    render() {
        return (
            <div className='item'>
                <div className='col col1'>
                    <div className='img'>
                        <Link to={`/catalog/${this.props.item.category}/${this.props.item.name}`}><img className='pull_left' width='98px' src={getCropUrl(this.props.item.image.url, 98)} alt={this.props.item.name} /></Link>
                    </div>
                    <div className='txt_w'>
                        <div className='txt'>
                            <h4>{this.props.item.name}</h4>
                            {!this.props.item.options ? null : this.props.item.options.map(o =>
                                <div className='desc' key={o.name}>{o.name}: {o.value}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='col col2'>
                    <p className='price'>{formatPrice(this.props.item.price)}</p>
                </div>
                <div className='col col3'>
                    <select className='qty col3' value={this.props.item.quantity} onChange={(e) => this.changeQty(e)}>
                        {[...Array(this.props.item.available === 0 ? 0 : this.props.item.available || 100).keys()].map(qty => <option key={qty + 1} value={qty + 1}>{qty + 1}</option>)}
                    </select>
                </div>
                <div className='col col4'>
                </div>
                <div className='col col5'>
                    <button className='delete' onClick={e => this.remove(e)} />
                </div>
            </div>
        );
    }
}