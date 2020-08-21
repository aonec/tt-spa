import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"
import 'antd/dist/antd.css';
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom"
import { grid } from "01/r_comp"
import { Tabs } from "./components/Tabs/Tabs"
import axios from '01/axios';
import { MoreOutlined } from '@ant-design/icons';
import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"



import { Title } from './components/Title'
import { Text } from './components/Text'
import { Tags } from './components/Tags/Tags'
import { Information } from './components/Information/Information'
import { Owner } from './components/Owner/Owner'
import { getApartment } from '01/_api/device_page';


import { EditButton } from './components/EditButton'
import "./ApartmentProfile.css";

function reducer(state, action) {
  const { type, data } = action
  switch (type) {
    case "success":
      return { ...state, ...data }
    default:
      console.error("objid", type)
      return state
  }
}

export const ApartmentProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {})
  useFetchPage(state, dispatch)
  const { 0: objid } = useParams()
  const { push } = useHistory()
  const info = useObjectInformation(state)
  // const changes = useDeviceChanges(state);
  const { header = [], events = [], aparts = [] } = state
  // console.log("changes", changes);
  console.log("changes");

  const Block = () => {
    return (
      <ul className="block">
        <li><a className="block__link">Редактировать квартиру</a></li>
        <li><a className="block__link">Добавить собственника</a></li>
        <li><a className="block__link">Добавить прибор учета</a></li>
        <li><a className="block__link">Удалить квартиру</a></li>
      </ul>
    )
  }


  const editButtonHandler = (event) => {
    console.log('buttonHandler')
    console.log(event.target)
    const a = document.querySelector('.block')
    console.log(a)
    a.classList.toggle('visible')
  }

  const [app, setApp] = useState({})


  async function getState() {
    await getApartment().then(response => (setApp(response)));
  }

  const someObj = app.housingStock;
  useEffect(() => {
    async function test() {
      await getState()
    }
    test();
    // let a = app.homeowners[0].firstName;

  },[]);

  const buttonHandler = () => {
    console.log(app);
    console.log(app.homeowners[0].firstName)
    console.log(someObj)
  }
  
  return styled(grid)(
    <>
      <div className="apartment-header">
        <div className="apartment-header__wrap">
          <Title size="32">Кв. №41</Title>
          <Text>Нижнекамск, ул. Мира, 36</Text>
        </div>

        <div className="apartment-header__button-wrap">
          <EditButton onClick={(event) => { editButtonHandler(event) }}><MoreOutlined /></EditButton>
          <Block />
        </div>
      </div>
      <Tabs />

      {/* <grid> */}
      <Route path="/*/(\\d+)" exact>
        {/* <Information {...info} /> */}
        {/* <Events title="Задачи с объектом" {...events} /> */}

        <Tags />
        <Information />
        <Owner name= {app.apartmentNumber} />
        {app.url}

        <button onClick={buttonHandler}>getApartment</button>


      </Route>
      {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
      {/* </grid> */}
      <Route path="/*/(\\d+)/testimony" exact>
        {/* <Documents {...info} /> */}
        <h2>Компонент Приборы Учета</h2>
      </Route>

      <button onClick={buttonHandler}>  apartmentNumber</button>


    </>
  )
}