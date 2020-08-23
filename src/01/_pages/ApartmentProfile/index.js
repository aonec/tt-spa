import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"
import 'antd/dist/antd.css';
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom"
import { grid } from "01/r_comp"
import { Tabs } from "./components/Tabs/Tabs"
import axios from '01/axios';
import { MoreOutlined } from '@ant-design/icons';
import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"

import { ApartmentTasks, ApartmentTasksTitle, ApartmentTask, ApartmentTaskTitle, ApartmentTaskState, ApartmentTaskDate } from "./components/ApartmentTasks";
import {Comments} from './components/Comments/Comments'

import { Title } from './components/Title'
import { Text } from './components/Text'
import { Tags } from './components/Tags/Tags'
import { Information } from './components/Information/Information'
import { Owner } from './components/Owner/Owner'
import { getApartment } from '01/_api/device_page';
import {Button} from './components/Button';


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
  const params = useParams()
  console.log("params[1]", params[1])

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

  const [apartment, setapartment] = useState({})


  async function getState() {
    await getApartment(params[1]).then(response => (setapartment(response)));
  }


  //Номер квартиры 
  const apartmentNumber = apartment.apartmentNumber;

  //Информация о доме
  const housingStock = { ...apartment.housingStock }

  //Город, улица, дом
  const city = housingStock.city;
  const street = housingStock.street;
  const number = housingStock.number;

  //Площадь жилого помещения
  const square = apartment.square;

  //Количество проживающих / зарегистрированных
  const numberOfLiving = apartment.numberOfLiving;

  //Нормативное количество проживающих
  const normativeNumberOfLiving = apartment.normativeNumberOfLiving;

  //Собственники
  const homeowners = { ...apartment.homeowners };

  //Первый собственник
  const { ...homeowners0 } = { ...homeowners[0] };

  //Константинопольский К.К.
  const firstName = homeowners0.firstName;

  //Контактный номер телефона;
  const phoneNumber = homeowners0.phoneNumber;

  //Номер лицевого счета
  const personalAccountNumber = homeowners0.personalAccountNumber;

  useEffect(() => {
    async function internalFunc() {
      await getState()
    }
    internalFunc();

  }, []);

  const buttonHandler = () => {
    console.log(params[0])
    console.log(apartment);
    console.log(square, normativeNumberOfLiving, numberOfLiving, homeowners, homeowners0);

  }

  return styled(grid)(
    <>
      <div className="apartment-header">
        <div className="apartment-header__wrap">
          <Title size="32">Кв. №{apartmentNumber}</Title>
          <Text>{city}, {street}, {number}</Text>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: '8fr 4fr'
        }}>
          <div>
            <Comments />
            <Tags />
            <Information />
            <Owner firstName={firstName} personalAccountNumber={personalAccountNumber} phoneNumber={phoneNumber} />
            {apartment.url}

            <button onClick={buttonHandler}>getApartment</button>
          </div>
          <div>
            <ApartmentTasks>
              <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
              <ApartmentTask>
                <ApartmentTaskTitle>
                  Некорректные показания
                </ApartmentTaskTitle>
                <ApartmentTaskState><img src={require("../../../public/icons/ok.svg")} />Выполнено</ApartmentTaskState>
                <ApartmentTaskDate><img src={require("../../../public/icons/calendar.svg")} />24.06.2020 10:32 — 31.07.2020 14:32</ApartmentTaskDate>
              </ApartmentTask>
              <ApartmentTask>
                <ApartmentTaskTitle>
                  Отсутствие подключения к вычислителю
                </ApartmentTaskTitle>
                <ApartmentTaskState><img src={require("../../../public/icons/ok.svg")} />Выполнено</ApartmentTaskState>
                <ApartmentTaskDate><img src={require("../../../public/icons/calendar.svg")} />24.06.2020 10:32 — 31.07.2020 14:32</ApartmentTaskDate>
              </ApartmentTask>
              <ApartmentTask>
                <ApartmentTaskTitle>
                  Неполадки с ОДПУ
                </ApartmentTaskTitle>
                <ApartmentTaskState><img src={require("../../../public/icons/ok.svg")} />Выполнено</ApartmentTaskState>
                <ApartmentTaskDate><img src={require("../../../public/icons/calendar.svg")} />24.06.2020 10:32 — 31.07.2020 14:32</ApartmentTaskDate>
              </ApartmentTask>
              <Button>Все задачи с объектом</Button>
            </ApartmentTasks>
          
          </div>
        </div>
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
    </>
  )
}