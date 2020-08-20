import React from 'react'
import { List, Typography, Button } from 'antd';
import "./Owner.css";

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



export const Owner = () => {
    return (
        <div className="owner-information">
            <h2 className="title-24">Константинопольский К.К.</h2>
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
            <Button>Перейти в профиль собственника</Button>
        </div>
    )
}