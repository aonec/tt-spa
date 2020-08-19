import React from "react"
import { Route } from "react-router-dom"
import styled from "reshadow/macro"

import { Loader } from "01/components"
import * as style from "_reshadow"

export const Changes = React.memo(
    ({ items = [], loading = true, path = null, onClick = () => { } }) => {

        items = [{
            id: 0,
            date: '16.08.2020 20:48',
            action: 'Редактирование поля «Дата следующей поверки»',
            name: 'Константинопольский К.К'
        },
        {
            id: 1,
            date: '16.08.2019 12:11',
            action: 'Создание прибора',
            name: 'Константинопольский К.К'
        },
        {
            id: 2,
            date: '16.08.2019 12:11',
            action: 'Создание прибора',
            name: 'Константинопольский К.К'
        },
        {
            id: 3,
            date: '16.08.2019 12:11',
            action: 'Создание прибора',
            name: 'Константинопольский К.К'
        },
        {
            id: 4,
            date: '16.08.2019 12:11',
            action: 'Создание прибора',
            name: 'Константинопольский К.К'
        },

        ]
        console.log(items[0])
        return styled(style.item)`
      item {
        grid-template-columns: 0.5fr 2fr 1.5fr;
        border-bottom: 1px solid var(--frame);
        padding: 16px;
        font-size: 14px;
        line-height: 16px;
        color: rgba(39, 47, 90, 0.8);
      }
      changes {
        display: grid;
      }
      Loader {
        margin: 0 auto;
      }
      ww {
          
        color: rgba(39, 47, 90, 0.6);
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        
      }
      wrap {
        background: rgba(39, 47, 90, 0.04);
        grid-template-columns: 0.5fr 2fr 1.5fr;
        border-bottom: 1px solid var(--frame);
        display: grid;
        grid-auto-flow: column;
         align-items: center;
         padding: 16px;
         grid-gap: 8px;
         cursor: pointer;
      }
    `(
            <Route path={path}>
                <changes>
                    <wrap className="descriptions">
                        <ww>Дата и время</ww>
                        <ww>Действие</ww>
                        <ww>Исполнитель</ww>
                    </wrap>

                    {/* <Loader show={loading} size="32" /> */}


                    {items.map(
                        ({ id,
                            date,
                            action,
                            name
                            // id,
                            // apartmentNumber,
                            // homeownerName,
                            // homeownersCount,
                            // personalAccountNumber,
                            // square,
                        }) => (
                                <item onClick={() => onClick(id)} key={id}>
                                    {/* <h4>{`№ ${date}`}</h4> */}
                                    <item_date>{date}</item_date>
                                    <item_action>{action}</item_action>
                                    <item_executor>
                                        {/* {name ?? "-"} м<sup>2</sup> */}
                                        {name}
                                    </item_executor>
                                </item>
                            )
                    )}


                    {/* {items.map(
                        ({
                            id,
                            apartmentNumber,
                            homeownerName,
                            homeownersCount,
                            personalAccountNumber,
                            square,
                        }) => (
                                <item onClick={() => onClick(id)} key={id}>
                                    <h4>{`№ ${apartmentNumber}`}</h4>
                                    <item_owner>{homeownerName}</item_owner>
                                    <item_number>{personalAccountNumber}</item_number>
                                    <item_square>
                                        {square ?? "-"} м<sup>2</sup>
                                    </item_square>
                                </item>
                            )
                    )} */}
                </changes>
            </Route>
        )
    }
)


// import React from "react"
// import styled, { use } from "reshadow/macro"
// import { useHistory, useParams } from "react-router-dom"

// import { Loader } from "01/components/Loader"
// import { information } from "01/r_comp"

// export const Changes = ({ list = [], loading = true, ...props }) => {
//     const { push } = useHistory()
//     console.log(list);

//     const params = useParams()
//     console.log(params)
//     console.log(params[1])

//     const test = [
//         "Активен",
//         "01.09.2017",
//         "01.09.2017",
//         "01.09.2023",
//         "Электричество",
//         "Туалет",
//         "14",
//         "Есть",
//         "ИЦ НК",
//         "Маяк НК",
//     ]
//     console.log(test)
//     return styled(information)`
//     Loader {
//       justify-self: center;
//     }
//   `(
//         <information {...props}>
//             <h2>Информация</h2>
//             {/* <ul>
//                 <li>
//                     16.08.2020 20:48
//                 </li>
//                 <li>
//                     16.08.2020 20:48
//                 </li>
//             </ul> */}

//             <info_list>
//                 {list.map(({ title, value, url }, index) => (
//                     <info_item
//                         key={title}
//                         {...use({ url })}
//                         onClick={url ? push(url) : null}
//                     >
//                         <span>{title}</span>
//                         <span>{test[index]}</span>
//                     </info_item>
//                 ))}
//             </info_list>
//         </information>
//     )
// }



