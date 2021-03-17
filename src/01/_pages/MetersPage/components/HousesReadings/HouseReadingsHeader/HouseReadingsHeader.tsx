import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns:
        32px minmax(180px, 240px) 16px minmax(152px, 232px) minmax(120px, 160px)
        minmax(120px, 160px) 75px minmax(134px, 304px);

    column-gap: 16px;
    color: var(--main-90);
    background-color: var(--main-4);
    border-bottom: 1px solid var(--frame);
    align-items: center;
    padding: 16px;

    font-size: 12px;
`

export const HouseReadingsHeader: React.FC = () => {
    return (
        <Container>
            <div>№ кв.</div>
            <div>ФИО собственника</div>
            <div></div>
            <div>Прибор</div>
            <div>Посл. показ.</div>
            <div>Тек. показ.</div>
            <div>Потребл.</div>
            <div>Комментарии</div>
        </Container>
    )
}
