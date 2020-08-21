import React from 'react'
import { List, Typography } from 'antd';
import "./Owner.css";

import { OwnerButton } from './OwnerButton'
import { Title } from '../Title';
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


export const Owner = (props) => {

    console.log(props);

    return (
        <div className="owner-information">
            <div className="owner-information__wrap">  <img src={require("./key.svg")} />
                <Title size="24">Константинопольский К.К.</Title>
    <Title size="24">{props.name}</Title>
            </div>

            <List
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                // bordered
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <Typography.Text>{descriptions[index]}</Typography.Text> {item}
                    </List.Item>
                )}
            />
            <OwnerButton>Перейти в профиль собственника</OwnerButton>
        </div>
    )
}