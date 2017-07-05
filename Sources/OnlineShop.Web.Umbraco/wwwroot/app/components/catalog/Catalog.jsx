import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/common'

export default class Catalog extends Component {
    render() {
        return (
            <article className='g_wrapper'>
                <section className='shop clearfix'>
                    <div id='align'>
                        <ul className='filters'>
                            <li className={!this.props.active ? 'active' : null}><Link to='/catalog'>Все <i className='ico'></i></Link></li>
                            {this.props.categories.map(c => <li key={c.key} className={this.props.active === c.name ? 'active' : null}><Link to={`/catalog/${c.name}`}>{c.name}<i className='ico'></i></Link></li>)}
                        </ul>
                    </div>
                    <ul className='products'>
                        {!this.props.products ? null : this.props.products.map(p => <li key={p.key}>
                            <Link to={this.props.active ? `/catalog/${this.props.active}/${p.name}` : `/catalog/${p.categories[0].name}/${p.name}`}>
                                <img alt={p.images[0].name} className='pull_left lazy' src={`${p.images[0].url}?anchor=center&mode=crop&width=200&height=200`} />
                                <span>{p.name}</span>
                                <span>{formatPrice(p.price)}</span>
                            </Link>
                            <div className="clearfix"></div>
                        </li>)}
                    </ul>
                </section>
            </article>
        );
    }
}