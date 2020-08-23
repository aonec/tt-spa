import React from 'react'
// import { List, Typography } from 'antd';
import { ListItem, ListItemDescription, ListItemValue } from '../ListItem';
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
            <ListItem><ListItemDescription>Площадь жилого помещения</ListItemDescription> <ListItemValue>78 м2</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Количество проживающих / зарегистрированных</ListItemDescription> <ListItemValue>4</ListItemValue></ListItem>
            <ListItem><ListItemDescription>Нормативное количество проживающих</ListItemDescription> <ListItemValue>4</ListItemValue></ListItem>
        </div>



    )
}