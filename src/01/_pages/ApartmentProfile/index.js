import React, { useState, useEffect } from "react"
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom"

import styled from "reshadow/macro"

import { grid } from "01/r_comp"
import { Tabs } from "./components/Tabs/Tabs"
import { Loader } from '01/components/Loader'

//библиотека обработки дат и локализация СНГ
import moment from 'moment'
import 'moment/locale/ru'

import { ApartmentTasks, ApartmentTasksTitle, ApartmentTask, ApartmentTaskTitle, ApartmentTaskState, ApartmentTaskDate } from "./components/ApartmentTasks";
import { Comments, Header, Tags, Information, Owner } from './components'

// Получаем типовые функции по запросам к серверу
import { getApartment, getTasks } from '01/_api/apartment_page';
import { ApartmentDevices } from './hoc/ApartmentDevices/ApartmentDevices'

//стилизация
import 'antd/dist/antd.css';
moment.locale('ru')


export const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setapartment] = useState({})
  const [tasks, setTasks] = useState({})
  const [loading, setLoading] = useState(true);

  const RenderTasks = () => {
    return (
      <div>
        <ApartmentTasks>
          <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
          {Tasks}
        </ApartmentTasks>
      </div>
    )
  };

  const buttonHandler = () => {
    // console.log("tasks", tasksArr)
  }

  //Получили список задач
  const tasksList = { ...tasks.items };
  //Здесь правило выдачи списка
  const tasksArr = [{ ...tasksList[0] }, { ...tasksList[4] }, { ...tasksList[8] }]


  const Tasks = tasksArr.map((value, index) => {
    const begin = moment(tasksArr[index].creationTime).format('DD.MM.YYYY, hh:mm');
    const ending = moment(tasksArr[index].closingTime || tasksArr[index].expectedCompletionTime).format('DD.MM.YYYY, hh:mm');
    return (
      <ApartmentTask key={index}>
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

  //Информация о доме: Город, улица, дом
  const { city, street, number } = { ...apartment.housingStock };

  //Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const { apartmentNumber, square, numberOfLiving, normativeNumberOfLiving } = apartment;

  //Собственники
  const homeowners = { ...apartment.homeowners };

  //Константинопольский К.К.
  const { firstName, phoneNumber, personalAccountNumber } = { ...homeowners[0] };

  useEffect(() => {
    async function getTasksAndApartments() {
      await getApartment(apartmentId).then(response => (setapartment(response)));
      setLoading(false)
      await getTasks(apartmentId).then(response => (setTasks(response)));
    }
    getTasksAndApartments();
  }, []);

  return styled(grid)(
    <>
      <Loader show={loading} size="32">
        <Header apartmentNumber={apartmentNumber}
          city={city}
          street={street}
          number={number} />
      </Loader>

      <Tabs />

      <Route path="/*/(\\d+)" exact>
        <div style={{
          "display": 'grid',
          "gridTemplateColumns": '8fr 4fr'
        }}>
          <div>
            <Comments />
            <Tags />
            <Information style={{ "paddingTop": '32px' }}
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


// import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"

// function reducer(state, action) {
//   const { type, data } = action
//   switch (type) {
//     case "success":
//       return { ...state, ...data }
//     default:
//       console.error("objid", type)
//       return state
//   }
// }


  // const [state, dispatch] = React.useReducer(reducer, {})
  // useFetchPage(state, dispatch)
    // const { 0: objid } = useParams()
  // const { push } = useHistory()