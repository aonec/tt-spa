import React from "react"
import styled from "styled-components";

const Container = styled.div`
display: grid;
grid-template-columns: minmax(0, 1fr) minmax(0, 3fr) minmax(0, 0.3fr) minmax(0, 1.8fr) minmax(0, 1.7fr) minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1.5fr);
column-gap: 16px;
color: var(--main-90);
background-color: var(--main-4);
border-bottom: 1px solid var(--frame);
align-items: center;
padding: 16px;
`

export const HouseReadingsHeader:React.FC = () => {

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



