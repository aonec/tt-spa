import React from 'react';
import { Table, Tag, Space } from 'antd';

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
    // {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    // },
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
        key: '1',
        name: 'Площадь жилого помещения',
        age: '78 м2',
        // address: 'New York No. 1 Lake Park',
        // tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Количество проживающих / зарегистрированных',
        age: 4,
        // address: 'London No. 1 Lake Park',
        // tags: ['loser'],
    },
    {
        key: '3',
        name: 'Нормативное количество проживающих',
        age: 4,
        // address: 'Sidney No. 1 Lake Park',
        // tags: ['cool', 'teacher'],
    },
];

export const Information = () => {
    return (
        <Table columns={columns} dataSource={data} pagination={false}/>
    )
}
