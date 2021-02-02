import React from "react"
import styled from "styled-components";

const Container = styled.div`
display: grid;
grid-template-columns: 32px 180px 16px 152px 120px 120px 75px minmax(0, 1.5fr);
column-gap: 16px;
color: var(--main-90);
background-color: var(--main-4);
border-bottom: 1px solid var(--frame);
align-items: center;
padding: 16px;


font-size: 12px;
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



