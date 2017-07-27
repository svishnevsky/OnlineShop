import React, { Component } from 'react'
export default class About extends Component {
    render() {
        return (
            <article className='g_wrapper'>
                <section className='blog clearfix blog_cat'>
                    <h1>О нас</h1>
                    <div dangerouslySetInnerHTML={{ __html: this.props.content}} />
                </section>
            </article>
        );
    }
}