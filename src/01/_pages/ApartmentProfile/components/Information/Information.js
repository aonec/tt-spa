import React from 'react'
import { ListItem, ListItemDescription, ListItemValue } from '../ListItem';
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



export const Information = (props) => {

    // var ListItems = descriptions.map(function (value, index) {

    //     return (
    //     <ListItem><ListItemDescription>{descriptions[index]}</ListItemDescription> <ListItemValue>{data[index]}</ListItemValue></ListItem>
    //     )

    // });


    const {normativeNumberOfLiving,numberOfLiving, square } = props;

    return (
        <div style={{ paddingTop: '32px' }}>
            <Title size="24">Информация</Title>
            <ListItem><ListItemDescription>{descriptions[0]}</ListItemDescription> <ListItemValue>{square}</ListItemValue></ListItem>
            <ListItem><ListItemDescription>{descriptions[1]}</ListItemDescription> <ListItemValue>{numberOfLiving}</ListItemValue></ListItem>
            <ListItem><ListItemDescription>{descriptions[2]}</ListItemDescription> <ListItemValue>{normativeNumberOfLiving}</ListItemValue></ListItem>
        </div>
    )
}
