import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Banner extends Component {
    render() {
        return (
            <article className='g_wrapper slider_w'>
                <div id='banner0' className='banner'>
                    <div>
                        <Link to='/catalog'>
                            <img src={this.props.url} alt={this.props.title} title={this.props.title} />
                        </Link>
                    </div>
                </div>
            </article>
        );
    }
}