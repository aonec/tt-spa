import React from "react"
import { Route } from "react-router-dom"
import styled from "reshadow/macro"
import "./test.css";
import { Loader } from "01/components"
import * as style from "_reshadow"
import { button } from "01/r_comp";
import $ from 'jquery';
const buttonHandler = (event) => {
    console.log('buttonHandler');
    const parentItem = event.target.closest('div');

    $(parentItem).find('input').prop('disabled', false);


}



export const History = React.memo(
    ({ items = [], loading = true, path = null, onClick = () => { } }) => {

        items = [{
            id: 0,
            date: 'Февраль 2020',
            action: '124 КВт/ч:',
            name: '123 КВт/ч',
            person: 'Константинопольский К.К.',
            dateandtime: '24 марта 2020  14:34'

        },
        {
            id: 1,
            date: 'Январь 2020',
            action: '124 КВт/ч:',
            name: '123 КВт/ч',
            person: 'Константинопольский К.К.',
            dateandtime: '24 марта 2020  14:34'
        },
        {
            id: 2,
            date: 'Декабрь 2019',
            action: '124 КВт/ч:',
            name: '123 КВт/ч',
            person: 'Константинопольский К.К.',
            dateandtime: '24 марта 2020  14:34'
        },
        {
            id: 3,
            date: 'Ноябрь 2019',
            action: '124 КВт/ч:',
            name: '123 КВт/ч',
            person: 'Константинопольский К.К.',
            dateandtime: '24 марта 2020  14:34'
        },
        {
            id: 4,
            date: 'Октябрь 2019',
            action: '124 КВт/ч:',
            name: '123 КВт/ч',
            person: 'Константинопольский К.К.',
            dateandtime: '24 марта 2020  14:34'
        },

        ]
        console.log(items[0])
        return styled(style.item)`
      item {
        grid-template-columns: 0.5fr 1fr 1.5fr 1fr;
        border-bottom: 1px solid var(--frame);
        padding: 16px;
        font-size: 14px;
        line-height: 16px;
        color: rgba(39, 47, 90, 0.8);
        align-items: flex-start;
      }
      history {
        display: grid;
      }
      Loader {
        margin: 0 auto;
      }
      h3 {
        color: rgba(39, 47, 90, 0.6);
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
      }
      wrap {
        background: rgba(39, 47, 90, 0.04);
        grid-template-columns: 0.5fr 1fr 1.5fr 1fr;
        border-bottom: 1px solid var(--frame);
        display: grid;
        grid-auto-flow: column;
         align-items: center;
         padding: 16px;
         grid-gap: 8px;
         cursor: pointer;
      }
        h3__wrap {
        display: grid;
        grid-template-columns: 1.5fr 1.5fr 1fr;
        }
        some {
            display: grid;
            grid-template-columns: 1.5fr 1.5fr 1fr;
            }
        plan {
            display: grid;
            grid-template-columns: 2fr 2fr;
            }
            item_date {
                padding: 16px 0;
        }
    `(
            <Route path={path}>
                <history>
                    <wrap className="descriptions">
                        <h3>Месяц</h3>
                        <h3__wrap>
                            <h3>Показания</h3>
                            <h3>Потребление</h3>
                        </h3__wrap>

                        <h3>Оператор</h3>
                        <h3>Дата и время</h3>
                    </wrap>

                    {/* <Loader show={loading} size="32" /> */}


                    {items.map(
                        ({ id,
                            date,
                            action,
                            name,
                            person,
                            dateandtime
                        }) => (
                                <item onClick={() => onClick(id)} key={id}>
                                    <item_date>{date}</item_date>

                                    <plans className="test">
                                        <plans__wrap className="test__wrap">
                                            <plan className="test__plan">
                                                <h4>Тариф 1</h4>
                                                {/* <item_action>{action}</item_action> */}
                                                <input placeholder={action} disabled/>
                                            </plan>
                                            <plan className="test__plan">
                                                <h4>Тариф 2</h4>
                                                {/* <item_executor>{name}</item_executor> */}
                                                <input placeholder={name} disabled />
                                            </plan>
                                        </plans__wrap>

                                        <button onClick={(event) => { buttonHandler(event) }}><img src={require("./edit.svg")} /></button>
                                    </plans>


                                    <item_date>{person}</item_date>
                                    <item_date>{dateandtime}</item_date>
                                </item>
                            )
                    )}
                </history>
            </Route>
        )
    }
)
{/* <h4>{`№ ${date}`}</h4> */ }

