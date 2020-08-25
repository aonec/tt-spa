import React from 'react'
import { Button, Title } from '../../components';
import { ListItem, ListItemDescription, ListItemValue } from '../ListItem';
import styled, { css } from 'styled-components'

const TitleWrap = styled.div`
display: flex;
align-items: baseline;

  ${props =>
        props.primary &&
        css`
      background: palevioletred;
      color: white;
    `};
`

export const Owner = (props) => {

    const descriptions = [
        'Номер лицевого счета',
        'Статус собственник',
        'Юридическое состояние',
        'Контактный номер телефона'
    ]
    // const data = [
    //     '12345678',
    //     'Передает показания',
    //     'Физическое лицо',
    //     '+7 999 999-99-99'
    // ];
    const { firstName, personalAccountNumber, phoneNumber, test, test2 } = props;
    return (
        <div style={{paddingTop:'32px'}}>
            <TitleWrap>  <img src={require("./key.svg")} />
                <Title size="24" style={{ paddingLeft: '8px' }}>{firstName}</Title>
            </TitleWrap>
            <ListItem><ListItemDescription>Номер лицевого счета</ListItemDescription> <ListItemValue>{personalAccountNumber || 'Запрос данных'}</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Статус собственник</ListItemDescription> <ListItemValue>{test || 'Запрос данных'}</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Юридическое состояние</ListItemDescription> <ListItemValue>{test2 || 'Запрос данных'}</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Контактный номер телефона</ListItemDescription> <ListItemValue>{phoneNumber || 'Запрос данных'}</ListItemValue></ListItem>

            <Button style={{ marginTop: '16px' }}>Перейти в профиль собственника</Button>
        </div>
    )
}