import React from 'react';
// import { Table, Tag, Space } from 'antd';
// import 'antd/dist/antd.css';

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

export const History = () => {
    return (
        // <Table columns={columns} dataSource={data} pagination={false} />
        <h2>Компонент в процессе разработки</h2>
    )
}


// import React from "react"
// import styled, { use } from "reshadow/macro"
// import { useHistory, useParams } from "react-router-dom"



// import { Loader } from "01/components/Loader"
// import { information } from "01/r_comp"

// export const History = ({ list = [], loading = true, ...props }) => {

//     return (
//         <div>test</div>

//     )
// }




// export const History = ({ list = [], loading = true, ...props }) => {
//     const { push } = useHistory()
//     console.log(list);
//     const params = useParams()
//     console.log(params[1])
//     return styled(information)`
//     Loader {
//       justify-self: center;
//     }
//   `(
//         <information {...props}>
//             <h2>Информация</h2>
//             {/* <Loader show={loading} size="32"> */}
//             {/* <info_list>
//                 {list.map(({ title, value, url }) => (
//                     <info_item
//                         key={title}
//                         {...use({ url })}
//                         onClick={url ? push(url) : null}
//                     >
//                         <span>{title}</span>
//                         <span>{value}</span>
//                     </info_item>
//                 ))}
//             </info_list> */}

//             <info_list>
//                 {list.map(({ title, value, url }) => (
//                     <info_item
//                         key={title}
//                         {...use({ url })}
//                         onClick={url ? push(url) : null}
//                     >
//                         <span>{title}</span>
//                         <span>{value}</span>
//                     </info_item>
//                 ))}
//             </info_list>

//             {/* </Loader> */}
//         </information>
//     )
// }
