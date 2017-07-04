﻿import React from 'react';
import Validation from 'react-validation'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&-]{6,32}$/;

Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value && value.toString().trim();
        },
        hint: () => {
            return <span className='error'>Поле обязательно</span>
        }
    },
    email: {
        rule: value => {
            return emailRegex.test(value);
        },
        hint: () => {
            return <span className='error'>Некорректный email-адрес</span>
        }
    },
    password: {
        rule: value => {
            return passwordRegex.test(value);
        },
        hint: () => {
            return <span className='error'>Длина должна быть от 6 до 32 символов включая латинские буквы (заглавные и строчные), цифры, знака препинания.</span>
        }
    }
});