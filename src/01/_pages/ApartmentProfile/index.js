import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom";

import { Icon } from "01/_components/Icon";

import styled from "reshadow/macro";

import { grid } from "01/r_comp";
import { Loader } from "01/components/Loader";
import moment from "moment";
import { getApartment, getTasks } from "01/_api/apartment_page";
import { Tabs } from "./components/Tabs/Tabs";

import {TasksNew} from './components/ApartmentTasksNew/ApartmentTasksNew'

// библиотека обработки дат и локализация СНГ
import "moment/locale/ru";

// import {
//   ApartmentTasks,
//   ApartmentTasksTitle,
//   ApartmentTask,
//   ApartmentTaskTitle,
//   ApartmentTaskState,
//   ApartmentTaskDate,
// } from './components/ApartmentTasks';


import {
  ApartmentTasks,
  ApartmentTasksTitle,
  ApartmentTask,
  ApartmentTaskTitle,
  ApartmentTaskState,
  ApartmentTaskDate,
} from './components/ApartmentTasksNew/ApartmentTasksNew';


import { Comments, Header, Tags, Information, Owner } from './components';

// Получаем типовые функции по запросам к серверу
import { Button } from './components/Button';
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';

// стилизация
import "antd/dist/antd.css";
moment.locale("ru");

const Index = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setapartment] = useState({});
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  const RenderTasks = () => (
    <>
      <ApartmentTasks>
        <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
       <TasksNew tasksArr={tasksArr}/>
        <Button>Все задачи с объектом</Button>
      </ApartmentTasks>
    </>
  );

  const buttonHandler = () => {
    // console.log("tasks", tasksArr)
  };

  // Получили список задач
  const tasksList = { ...tasks.items };
  // Здесь правило выдачи списка
  const tasksArr = [
    { ...tasksList[0] },
    { ...tasksList[4] },
    { ...tasksList[8] },
  ];


  // const Tasks = tasksArr.map((value, index) => {
  //   const begin = moment(tasksArr[index].creationTime).format(
  //     "DD.MM.YYYY, hh:mm"
  //   );
  //   const ending = moment(
  //     tasksArr[index].closingTime || tasksArr[index].expectedCompletionTime
  //   ).format("DD.MM.YYYY, hh:mm");
  //   return (
  //     <ApartmentTask key={index}>
  //       <ApartmentTaskTitle>{tasksArr[index].name}</ApartmentTaskTitle>
  //       <ApartmentTaskState>
  //         <Icon icon="ok" />
  //         Выполнено
  //       </ApartmentTaskState>
  //       <ApartmentTaskDate>
  //         <Icon icon="calendar" />
  //         {begin}
  //         &nbsp;-&nbsp;
  //         {ending}
  //       </ApartmentTaskDate>
  //     </ApartmentTask>
  //   );
  // });

  // Информация о доме: Город, улица, дом
  const { city, street, number } = { ...apartment.housingStock };

  // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const {
    apartmentNumber,
    square,
    numberOfLiving,
    normativeNumberOfLiving,
  } = apartment;

  // Собственники
  const homeowners = { ...apartment.homeowners };

  // Константинопольский К.К.
  const { firstName, phoneNumber, personalAccountNumber } = {
    ...homeowners[0],
  };

  useEffect(() => {
    async function getTasksAndApartments() {
      await getApartment(apartmentId).then((response) =>
        setapartment(response)
      );
      setLoading(false);
      await getTasks(apartmentId).then((response) => setTasks(response));
    }
    getTasksAndApartments();
  }, []);

  return styled(grid)(
    <>
      <Loader show={loading} size="32">
        <Header
          apartmentNumber={apartmentNumber}
          city={city}
          street={street}
          number={number}
        />
      </Loader>

      <Tabs />

      <Route path="/*/(\\d+)" exact>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "8fr 4fr",
          }}
        >
          <div>
            <Comments />
            <Tags />
            <Information
              style={{ paddingTop: "32px" }}
              numberOfLiving={numberOfLiving || "Данные обновляются"}
              normativeNumberOfLiving={
                normativeNumberOfLiving || "Данные обновляются"
              }
              square={square || "74 кв.м."}
            />
            <Owner
              firstName={firstName}
              personalAccountNumber={personalAccountNumber}
              phoneNumber={phoneNumber}
            />
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
  );
};

export { Index };
