import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className='g_wrapper'>
                <div className='content'>

                    <div>
                        <img src='/images/paymentproviders.png' className='payment-methods' />
                    </div>

                    <div>
                        <a target='_blank' className='share' href='https://facebook.com'>
                            <img src='/images/F.png' />
                        </a>
                        <a target='_blank' className='share' href='https://instagram.com'>
                            <img src='/images/Instagram.png' />
                        </a>
                        <a target='_blank' className='share' href='https://vk.com'>
                            <img src='/images/Vkontakte.png' />
                        </a>
                    </div>

                    <div>
                        <h2>&copy; 2017 {new Date().getFullYear() > 2017 ? `-${new Date().getFullYear()}` : null} ИП Волченко Ирина Константиновна УНП 591199936</h2>                      
                    </div>
                </div>
                <div className='content'>Работаем 24/7</div>

            </footer>
        );
    }
}