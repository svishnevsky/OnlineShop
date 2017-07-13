import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BlockUi from 'react-block-ui'
import ProductList from './ProductList.jsx'

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
                    <BlockUi tag='div' blocking={!this.props.products}>
                        <ProductList products={this.props.products} catalog={this.props.active} cropWidth='200' />
                    </BlockUi>
                </section>
            </article>
        );
    }
}