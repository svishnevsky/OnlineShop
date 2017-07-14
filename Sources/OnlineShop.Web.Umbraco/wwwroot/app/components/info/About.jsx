import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <article className='g_wrapper'>
                <section className='blog clearfix blog_cat'>
                    <h1>О нас</h1>
                    <p>Индивидуальный предприниматель Волченко Ирина Константиновна</p>
                    <p>УНП 591199936</p>
                    <p>Св-во выдано Администрацией Октябрьского района г.Гродно 26.04.2017г.</p>
                    <p>Р/с  3013574033015</p>
                    <p>Дирекция ОАО «Белинвестбанк» по Гродненской области</p>
                    <p>Код банка: 153001739, УНП 807000028</p>
                    <p>Адрес банка: г.Гродно, ул.Мицкевича, 3</p>
                </section>
            </article>
        );
    }
}