import React from 'react'
import { List, Typography } from 'antd';
import "./Owner.css";

import {Button } from '../Button';
import { Title } from '../Title';

import { ListItem, ListItemDescription, ListItemValue } from '../ListItem';


export const Owner = (props) => {

    const descriptions = [
        'Номер лицевого счета',
        'Статус собственник',
        'Юридическое состояние',
        'Контактный номер телефона'
    ]

    const data = [
        '12345678',
        'Передает показания',
        'Физическое лицо',
        '+7 999 999-99-99'
    ];


    console.log(props);

    return (
        <div className="owner-information">
            <div className="owner-information__wrap">  <img src={require("./key.svg")} />
                {/* <Title size="24">Константинопольский К.К.</Title> */}
                <Title size="24">{props.firstName}</Title>
            </div>
            <ListItem><ListItemDescription>Номер лицевого счета</ListItemDescription> <ListItemValue>{props.personalAccountNumber}</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Контактный номер телефона</ListItemDescription> <ListItemValue>Передает показания</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Контактный номер телефона</ListItemDescription> <ListItemValue>Физическое лицо</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Контактный номер телефона</ListItemDescription> <ListItemValue>{props.phoneNumber}</ListItemValue></ListItem>
            {/* <List
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                // bordered
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <Typography.Text>{descriptions[index]}</Typography.Text> {item}
                    </List.Item>
                )}
            /> */}
            <Button style={{marginTop: '16px'}}>Перейти в профиль собственника</Button>
        </div>
    )
}