import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
const columns = [
    {
        title: 'Описание',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a>{text}</a>,
    },
    {
        title: 'Статус',
        dataIndex: 'age',
        key: 'age',
    },
];

const data = [
    {
        key: '1',
        name: 'Номер лицевого счета',
        age: '78 м2',

    },
    {
        key: '2',
        name: 'Статус собственник',
        age: 'Передает показания',

    },
    {
        key: '3',
        name: 'Юридическое состояние',
        age: 'Физическое лицо',

    },
    {
        key: '4',
        name: 'Контактный номер телефона',
        age: '+7 999 999-99-99',

    },
];

export const Owner = () => {
    return (
        <div>
            <h2>Константинопольский К.К2</h2>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Button>Перейти в профиль собственника</Button>
            <hr />
        </div>
    )
}
