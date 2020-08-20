import React from 'react'
import { List, Typography, Divider } from 'antd';
import "./Information.css";

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
            <h2 className="title-24">Информация</h2>
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