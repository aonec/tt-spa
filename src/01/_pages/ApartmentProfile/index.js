import React, { useState, useEffect } from "react"
import styled from "reshadow/macro"
import 'antd/dist/antd.css';
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom"
import { grid } from "01/r_comp"
import { Tabs } from "./components/Tabs/Tabs"
import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"

//библиотека обработки дат и локализация СНГ
import moment from 'moment'
import 'moment/locale/ru'

import { ApartmentTasks, ApartmentTasksTitle, ApartmentTask, ApartmentTaskTitle, ApartmentTaskState, ApartmentTaskDate } from "./components/ApartmentTasks";
import { Comments } from './components/Comments/Comments'
import { Header } from './components/Header';

import { Tags } from './components/Tags/Tags'
import { Information } from './components/Information/Information'
import { Owner } from './components/Owner/Owner'
import { getApartment, getTasks } from '01/_api/apartment_page';
import { ApartmentDevices } from './components/ApartmentDevices/ApartmentDevices'

import "./ApartmentProfile.css";
import 'moment/locale/ru';
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
moment.locale('ru')
export const ApartmentProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {})
  useFetchPage(state, dispatch)
  const { 0: objid } = useParams()
  const { push } = useHistory()
  const info = useObjectInformation(state)
  // const changes = useDeviceChanges(state);
  const { header = [], events = [], aparts = [] } = state
  const params = useParams();
  const [apartment, setapartment] = useState({})
  const [tasks, setTasks] = useState({})

  const RenderTasks = () => {
    return (
      <div>
        <ApartmentTasks>
          <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
          {someMap}
        </ApartmentTasks>
      </div>
    )
  };

  const buttonHandler = () => {
    console.log(params[0])
    console.log("tasks", tasksArr)
  }

  async function getState() {
    await getApartment(params[1]).then(response => (setapartment(response)));
  }

  async function getApartmentTasks() {
    await getTasks(params[1]).then(response => (setTasks(response)));
  }

  //Задачи с объектом
  const a = { ...tasks.items };

  const tasksArr = [{ ...a[0] }, { ...a[4] }, { ...a[8] }]


  const someMap = tasksArr.map((value, index) => {
    const name = tasksArr[index].name;
    const begin = moment(tasksArr[index].creationTime).format('DD.MM.YYYY, hh:mm');
    const ending = moment(tasksArr[index].closingTime || tasksArr[index].expectedCompletionTime).format('DD.MM.YYYY, hh:mm');
    return (
      // eslint-disable-next-line react/jsx-key
      <ApartmentTask>
        <ApartmentTaskTitle>
          {tasksArr[index].name}
        </ApartmentTaskTitle>
        <ApartmentTaskState><img src={require("../../../public/icons/ok.svg")} />Выполнено</ApartmentTaskState>
        <ApartmentTaskDate><img src={require("../../../public/icons/calendar.svg")} />
          {begin}&nbsp;-&nbsp;{ending}
          {/* {tasksArr[index].closingTime || tasksArr[index].expectedCompletionTime}  */}
        </ApartmentTaskDate>
      </ApartmentTask>

    )
  })


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

    async function getApartmentTasksInternal() {
      await getApartmentTasks()
    }

    internalFunc();
    getApartmentTasksInternal();

  }, []);


  return styled(grid)(
    <>

      <Header apartmentNumber={apartmentNumber}
        city={city}
        street={street}
        number={number} />

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
            <Information style={{ paddingTop: '32px' }}
              numberOfLiving={numberOfLiving || 'Данные обновляются'}
              normativeNumberOfLiving={normativeNumberOfLiving || 'Данные обновляются'}
              square={square || '74 кв.м.'}
            />
            <Owner firstName={firstName} personalAccountNumber={personalAccountNumber} phoneNumber={phoneNumber} />

            <div>
              <button onClick={buttonHandler}>getApartment</button>
            </div>
          </div>
          <div>
            <RenderTasks />

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
        <ApartmentDevices />
      </Route>
    </>
  )
}