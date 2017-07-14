import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { formatPrice, getCropUrl } from '../../utils/common'

export default class BasketItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: props.item.quantity
        }
    }

    changeQty(e) {
        e.preventDefault();
        const newQty = e.target.value;
        if (newQty < 0 || newQty > this.props.item.available) {
            return;
        }

        let state = this.state;
        state.quantity = e.target.value;
        this.setState(state);
        this.props.addToTotal((newQty - this.props.item.quantity) * this.props.item.price);
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
                    <input className='qty col3' type='number' onChange={(e) => this.changeQty(e)} value={this.state.quantity} />
                </div>
                <div className='col col4'>
                </div>
                <div className='col col5'>
                    <button className='delete' />
                </div>
            </div>
        );
    }
}