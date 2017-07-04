import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <footer className='g_wrapper'>
                <div className='content'>

                    <div>
                        <img src='/images/paymentproviders.png' className='payment-methods' />
                    </div>

                    <div>
                        <a target='_blank' className='share' href='#'>
                            <img src='/images/F.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/Gplus.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/T.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/Instagram.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/Tumblr.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/YT.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/Vkontakte.png' />
                        </a><a target='_blank' className='share' href='#'>
                            <img src='/images/Pinterest.png' />
                        </a>
                    </div>

                    <div>
                        <h2>&copy; 2017 {new Date().getFullYear() > 2017 ? `-${new Date().getFullYear()}` : null} ИП Волченко Ирина Константиновна</h2>
                    </div>
                </div>

                <nav className='footer-nav'>
                    {!this.props.user ? null : <Link to='/logout'>Выйти</Link>}
                </nav>

            </footer>
        );
    }
}