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

import { Tasks } from './components/ApartmentTasks/ApartmentTasks';

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';

import { convertDate } from '../../_api/utils/convertDate';

// стилизация
import 'antd/dist/antd.css';

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setapartment] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const buttonHandler = () => {
    // console.log("tasks", tasksArr)
  };

  const Wrapper = styledComponents.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  padding-bottom: 40px;
`;

  // Получили список задач
  const tasksList = { ...tasks.items };
  // Здесь правило выдачи списка
  // const tasksArr = [
  //   { ...tasksList[0] },
  //   { ...tasksList[4] },
  //   { ...tasksList[8] },
  // ];

  // taskList.filter((item, index) => [0, 4, 8].includes(index)).map((task, ind) => {
  //
  // }
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
      await getApartment(apartmentId).then((response) => setapartment(response));
      await getTasks(apartmentId).then((response) => setTasks(response));
      setLoading(false);
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
        <Wrapper>
          <div>
            <Comments />
            <Tags />
            <Information
              style={{ paddingTop: '32px' }}
              numberOfLiving={numberOfLiving || 'Данные обновляются'}
              normativeNumberOfLiving={
                normativeNumberOfLiving || 'Данные обновляются'
              }
              square={square || 'Данные обновляются'}
            />
            <Owner
              firstName={firstName}
              personalAccountNumber={personalAccountNumber}
              phoneNumber={phoneNumber}
            />
          </div>
          <div>
            <Tasks tasksList={tasksList} />
          </div>
        </Wrapper>
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
    </>,
  );
};

export { ApartmentProfile };
