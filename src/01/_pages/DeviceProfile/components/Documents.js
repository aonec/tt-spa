import React, { useState } from 'react';
import axios from '01/axios';

import { button } from '01/r_comp';
// import { Table, Tag, Space } from 'antd';
// import 'antd/dist/antd.css';

import { getInfo } from '../../../_api/device_page';


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
    // let a;


    const URL = "HousingStocks"

    const replaceURL = (url = "") => url.replace(/objects/, URL)


    // utils
    function createTitleObject(data) {
        const { street, number, city } = data
        return [`${street}, ${number}`, city]
    }

    async function getInfo(url = "") {
        try {
            const res = await axios.get(replaceURL(url))
            console.log("url", url)
            //console.log(res);
            console.log({ ...res, info: true, header: createTitleObject(res) });
            return { ...res, info: true, header: createTitleObject(res) }
        } catch (error) { }
    }

    let tess;

    async function f(url = "") {
        const res = await axios.get(replaceURL(url))

        // let promise = new Promise((resolve, reject) => {
        //     setTimeout(() => resolve("готово!"), 1000)
        // });

        // let result = await promise; // будет ждать, пока промис не выполнится (*)

        console.log('result', res); // "готово!"
        tess=res;
        console.log('tess', tess)
    }

    f(`/objects/755/devices/1325866`);

    const a = f(`/objects/755/devices/1325866`);
 








    const buttonHandler = () => {
        console.log(tess)
    }



    return (
        // <Table columns={columns} dataSource={data} pagination={false} />
        <>
            <h2>Компонент Документы в процессе разработки</h2>
            <button onClick={buttonHandler}>Test</button>
        </>
    )
}









