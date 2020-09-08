import React, { useState, useEffect } from 'react';
import {
  Route, useRouteMatch, useParams, useHistory,
} from 'react-router-dom';
import styled from 'reshadow/macro';
import styledComponents from 'styled-components';

import { grid } from '01/r_comp';
import { Loader } from '01/components/Loader';

import { getApartment, getTasks } from '01/_api/apartment_page';
import { Tabs } from './components/Tabs/Tabs';
import {
  Comments, Header, Tags, Information, Owner,
} from './components';

import { Events } from './components/Events';

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';

// стилизация
import 'antd/dist/antd.css';

const Wrapper = styledComponents.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  padding-bottom: 40px;
`;

export const ApartmentContext = React.createContext();

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setApartment] = useState({});
  const [tasks, setTasks] = useState([]);

  const buttonHandler = () => {
    console.log("tasks", tasks)
    console.log("apartment", apartment)
  };

  // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const {
    apartmentNumber,
    square,
    numberOfLiving,
    normativeNumberOfLiving,
  } = apartment;

  // Информация о доме: Город, улица, дом
  const { city, street, number } = {...apartment.housingStock};

  // Собственники
  const homeowners = {...apartment.homeowners};

  // Получили список задач
  const tasksList = tasks.items;

  // Константинопольский К.К.
  const { firstName, phoneNumber, personalAccountNumber } = {
    ...homeowners[0],
  };

  useEffect(() => {
    getApartment(apartmentId).then((response) => setApartment(response));
    getTasks(apartmentId).then((response) => setTasks(response));
  }, []);

  return styled(grid)(
    <>
      <ApartmentContext.Provider
        value={{
          // device,
          // building,
          tasks
        }}
      >
      <Header
        apartmentNumber={apartmentNumber}
        city={city}
        street={street}
        number={number}
      />

      <Tabs/>

      <Route path="/*/(\\d+)" exact>
        <Wrapper>
          <div>
            <button onClick={buttonHandler}>buttonHandler</button>
            <Comments/>
            <Tags/>
            <Information
              style={{ paddingTop: '32px' }}
              square={square || 'Данные обновляются'}
              numberOfLiving={numberOfLiving || 'Данные обновляются'}
              normativeNumberOfLiving={
                normativeNumberOfLiving || 'Данные обновляются'
              }

            />
            <Owner
              firstName={firstName}
              personalAccountNumber={personalAccountNumber}
              phoneNumber={phoneNumber}
            />
          </div>
          <div>
            <Events title="Задачи с объектом" />
          </div>
        </Wrapper>
      </Route>

      <Route path="/*/(\\d+)/testimony" exact>
        <ApartmentDevices/>
      </Route>
        </ApartmentContext.Provider>
    </>
  );
};

export { ApartmentProfile };
