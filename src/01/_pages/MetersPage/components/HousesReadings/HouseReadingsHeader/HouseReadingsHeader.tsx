import React from "react"
import styled from "styled-components";

const Container = styled.div`
display: grid;
// grid-template-columns: 1fr 2.5fr 0.2fr 2fr 1.9fr 1.9fr 1.6fr 1.2fr;



// grid-template-columns: 1fr 3fr 0.5fr 2fr 2fr 100px 1fr 1.5fr;
// grid-template-columns: 1fr 3fr 0.5fr 2fr 2fr 1.5fr repeat(2, 100px);
grid-template-columns: minmax(0, 1fr) minmax(0, 3fr) minmax(0, 0.3fr) minmax(0, 1.8fr) minmax(0, 1.7fr) minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1.5fr);

column-gap: 16px;
color: var(--main-90);
background-color: var(--main-4);
border-bottom: 1px solid var(--frame);
// height: 48px;
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



