import React from 'react'
import styled from 'reshadow/macro'
import { useParams } from 'react-router-dom'
import { input, button } from '../../r_comp'
// import { Tabs } from './components/Tabs'

import './ErrorPage.css'
const buttonHandler = () => {
    window.open('/')
}

export const ErrorPage = () => {
    const params = useParams()
    return styled(button)(
        <div className="error-page">
            <h1 className="error-page__title title-40">Ресурсы не найдены</h1>
            <button
                className="error-page__button"
                data-big
                data-primary
                onClick={buttonHandler}
            >
                <span>Вернуться к работе</span>
            </button>
            {/* <img  src="https://satamalam.ru/public/404.svg" /> */}
            <img className="error-page__image" src={require('./404.svg')} />
        </div>
    )
}
