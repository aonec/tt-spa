import React from 'react'
import styled from 'reshadow/macro'
import { useParams } from 'react-router-dom'
import { input, button } from "../../r_comp"
// import { Tabs } from './components/Tabs'

export const ErrorPage = () => {
    const params = useParams()
    return styled(button)(
        <div>
            <h1>Ресурсы не найдены</h1>
            <button data-big data-primary>
                <span>Вернуться к работе</span></button>
        </div>
    )
}