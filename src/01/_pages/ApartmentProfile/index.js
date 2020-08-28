import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom";
import styled from "reshadow/macro";

import { grid } from "01/r_comp";
import { Loader } from "01/components/Loader";

import { getApartment, getTasks } from "01/_api/apartment_page";
import { Tabs } from "./components/Tabs/Tabs";


import { Comments, Header, Tags, Information, Owner } from './components';

import { Tasks } from './components/ApartmentTasks/ApartmentTasks'

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';

import {convertDate} from "./utils/utils";

// стилизация
import "antd/dist/antd.css";

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setapartment] = useState({});
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  const buttonHandler = () => {
    console.log("tasks", tasksArr)
    convertDate()
  };

  // Получили список задач
  const tasksList = { ...tasks.items };
  // Здесь правило выдачи списка
  const tasksArr = [
    { ...tasksList[0] },
    { ...tasksList[4] },
    { ...tasksList[8] },
  ];


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
    async function getTasksAndApartments(){
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

      <Tabs/>

      <Route path="/*/(\\d+)" exact>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "8fr 4fr",
            paddingBottom: '40px'
          }}
        >
          <div>
            <button onClick={buttonHandler}> buttonHandler</button>

            <Comments/>
            <Tags/>
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
          </div>
          <div>
            <Tasks tasksArr={tasksArr}/>
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
        <ApartmentDevices/>
      </Route>
    </>
  );
};


export { ApartmentProfile };
