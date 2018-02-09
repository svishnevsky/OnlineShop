import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui'

const tabs = [
    { path: '/account/orders', name: 'История покупок' },
    { path: '/account', name: 'Личная информация' },
    { path: '/account/password', name: 'Смена пароля' }
];

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.goToLogin();
    }

    componentDidMount() {
        if (!this.props.authenticated) {
            this.props.goToLogin();
        }
    }

    componentWillReceiveProps(next) {
        if (!next.authenticated) {
            this.props.goToLogin();
        }
    }

    renderContent(content) {
        return (
            <article className='g_wrapper'>
                <section className='account clearfix'>
                    <h1 className='page_h'>Личный кабинет</h1>
                    <div className='page_controls'>
                        <p><button onClick={this.handleLogout}>Выйти</button></p>
                    </div>
                    <ul className='nav'>
                        {tabs.map(t => <li key={t.path} className={this.props.path === t.path ? 'active' : null}><Link to={t.path}>{t.name}</Link><i className='border'></i></li>)}
                    </ul>
                    <BlockUi tag='div' className='tab_content' blocking={this.props.loading}>
                        <div className='clearfix' />
                        {content}
                    </BlockUi>
                </section>
            </article>
        );
    }
}