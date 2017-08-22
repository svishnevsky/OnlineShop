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
                        <a target='_blank' className='share' href='https://www.facebook.com/irene.italiano.5'>
                            <img src='/images/F.png' />
                        </a>
                        <a target='_blank' className='share' href='http://instagram.com/i_i_b_b'>
                            <img src='/images/Instagram.png' />
                        </a>
                        <a target='_blank' className='share' href='https://vk.com/id427731664'>
                            <img src='/images/Vkontakte.png' />
                        </a>
                    </div>

                    <div>
                        <h2>&copy; 2017 {new Date().getFullYear() > 2017 ? `-${new Date().getFullYear()}` : null} ИП Волченко Ирина Константиновна</h2>                      
                        <p>УНП 591199936 св-во от 26.04.17г.</p>
                    </div>
                </div>
                <div className='content working'>Работаем 24/7</div>

            </footer>
        );
    }
}