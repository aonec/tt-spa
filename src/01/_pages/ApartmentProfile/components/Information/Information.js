import React from 'react'
import { List, Typography } from 'antd';
import "./Information.css";
import { Title } from '../Title';

const data = [
    '78 м2',
    '4',
    '4',
];

const descriptions = [
    'Площадь жилого помещения',
    'Количество проживающих / зарегистрированных',
    'Нормативное количество проживающих',
]


export const Information = () => {
    return (
        <div className="appartment-information">
            
            <Title size="24">Информация</Title>
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


        </div>



    )
}