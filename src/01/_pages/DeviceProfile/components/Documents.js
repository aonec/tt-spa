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
import { getDevice, getApartment } from '01/_api/device_page';

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
];

export const Documents = () => {
    const [state, setState] = useState()

    async function getState() {
        await getApartment().then(response => (setState(response)));
    }
    getState();


    return (
        <>
            <h2>Компонент Документы в процессе разработки</h2>
            <button>Test</button>
        </>
    )
}









