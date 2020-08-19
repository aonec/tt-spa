import React, { useState } from 'react';
import axios from '01/axios';

import { button } from '01/r_comp';
// import { Table, Tag, Space } from 'antd';
// import 'antd/dist/antd.css';

import { test, getDevices, getApartmentInfo } from '../api'

import styled, { use } from "reshadow/macro"
import { useHistory, useParams } from "react-router-dom"



import { Loader } from "01/components/Loader"
import { information } from "01/r_comp"
import { useEffect } from 'react';

export const Information = ({ list = [], loading = true, ...props }) => {
    const { push } = useHistory()
    console.log(list);

    const params = useParams()
    console.log(params)
    console.log(params[1])
}

const columns = [
    {
        title: 'Месяц',
        dataIndex: 'month',
        key: 'month',
        // render: text => <a>{text}</a>,
    },
    {
        title: 'Показания',
        dataIndex: 'data',
        key: 'data',
    },
    {
        title: 'Потребление',
        dataIndex: 'use',
        key: 'use',
    },
    {
        title: 'Оператор',
        dataIndex: 'operator',
        key: 'operator',
    },
    {
        title: 'Дата и время',
        dataIndex: 'dateandtime',
        key: 'dateandtime',
    },

    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <>
    //             {tags.map(tag => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

const data = [
    {
        month: 'Февраль 2020',
        data: 'Тариф 1',
        use: '0 м',
        operator: 'Константинопольский К.К.',
        dateandtime: "24 марта 2020 14:34",
    },
    {
        month: 'Февраль 2020',
        data: 'Тариф 1',
        use: '123 КВт/ч',
        operator: 'Константинопольский К.К.',
        dateandtime: "24 марта 2020 14:34",
    },
    {
        month: 'Февраль 2020',
        data: 'Тариф 1',
        use: '123 КВт/ч',
        operator: 'Константинопольский К.К.',
        dateandtime: "24 марта 2020 14:34",
    },
    // {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     address: 'London No. 1 Lake Park',
    //     tags: ['loser'],
    // },

];


export const Documents = () => {
    const params = useParams()
    const a = test;
    const b = getDevices;
    const result = getApartmentInfo(1125376);

    const buttonHandler = () => {
        console.log("buttonHandler");
        console.log(params)
        console.log(params[1])
        console.log(a);
        console.log(getApartmentInfo(1125376))

        // 1125376


    }
    const [state, setState] = useState({});
    console.log(state)
    useEffect(() => {
        console.log('test');
        console.log(result);
    },[]);

    return (
        // <Table columns={columns} dataSource={data} pagination={false} />
        <>
            <h2>Компонент Документы в процессе разработки</h2>
            <button onClick={buttonHandler}>Test</button>
        </>
    )
}









