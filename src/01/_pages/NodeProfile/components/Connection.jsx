import React, { useContext } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { NodeContext } from '../index'
import { IconTT } from '../../../tt-components'

export const Connection = () => {
    const { calculator } = useContext(NodeContext)
    const {
        model,
        id,
        serialNumber,
        lastCheckingDate,
        futureCheckingDate,
        closingdate,
    } = calculator

    const resLastCheckingDate =
        lastCheckingDate !== null
            ? moment(lastCheckingDate).format('DD.MM.YYYY')
            : 'Дата поверки не указана'
    const resFutureCheckingDate =
        futureCheckingDate !== null
            ? moment(futureCheckingDate).format('DD.MM.YYYY')
            : 'Следующая Дата поверки не указана'
    const icon = closingdate !== null ? 'green' : 'red'

    const CalcItem = () => (
        <ListItem>
            <NavLink to={`/calculators/${id}`}>
                <NameWrap>
                    <IconTT icon="device" style={{ marginRight: '8px' }} />
                    <NameAndSerialNumber>
                        <Name style={{ marginRight: '8px' }}>{model}</Name>
                        <Serial>{` (${serialNumber})`}</Serial>
                    </NameAndSerialNumber>
                </NameWrap>
            </NavLink>
            <State>
                <IconTT icon={icon} />
                {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
            </State>
            <Dates>{`${resLastCheckingDate} - ${resFutureCheckingDate}`}</Dates>
        </ListItem>
    )

    return (
        <ListWrap>
            <Title>Соединение с вычислителем</Title>
            <CalcItem />
        </ListWrap>
    )
}

export default Connection

const Template = styled.div``

const NameWrap = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;

    &:hover {
        h3,
        p {
            color: var(--primary-100);
        }
    }
`

const NameAndSerialNumber = styled.div`
    display: inline-flex;
    align-items: center;
`
const Name = styled.h3`
    padding: 0;
    margin: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
`

const Serial = styled.p`
    padding: 0;
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: rgba(39, 47, 90, 0.6);
`

const State = styled.div`
    display: flex;
    align-items: center;
    color: rgba(39, 47, 90, 0.8);
`

const Title = styled.h2``

const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`

const ListItem = styled.div`
    display: grid;
    grid-template-columns: 4fr 2fr 6fr;
    grid-template-rows: 48px;
    align-items: center;
    border-bottom: 1px solid var(--frame);
    opacity: 0.8;
`

const Dates = styled.span`
    display: flex;
    justify-content: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: rgba(39, 47, 90, 0.6);
`
