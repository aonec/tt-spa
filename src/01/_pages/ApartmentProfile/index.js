import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import styled from 'reshadow/macro';
import styledComponents from 'styled-components';
import { grid } from '01/r_comp';
import { Loader } from '01/components/Loader';
import { getApartment, getTasks, getApartmentDevices } from './apiApartmentProfile';
import { Tabs } from './components/Tabs';
import Owners from "./components/Owners";
import {Comments, Header, Tags, Information} from './components';

import { Tasks } from './components/ApartmentTasks/ApartmentTasks';

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setapartment] = useState();
  const [tasks, setTasks] = useState();
  const [devices, setDevices] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTasksAndApartments() {
      await getApartment(apartmentId).then((response) => setapartment(response));
      await getTasks(apartmentId).then((response) => setTasks(response));
      await getApartmentDevices(apartmentId).then((response) => setDevices(response));
      setLoading(false);
    }
    getTasksAndApartments();
  }, []);


  const Wrapper = styledComponents.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  padding-bottom: 40px;
`;

  if (!apartment || !tasks) {
    return <Loader show={loading} size="32" />;
  }

  // Получили список задач
  const tasksList = tasks.items;

  // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const {
    apartmentNumber,
    square,
    numberOfLiving,
    normativeNumberOfLiving,
    housingStock,
    homeowners,
  } = apartment;

  const { city, street, number } = housingStock;

  return styled(grid)(
    <>
      <Header
        apartmentNumber={apartmentNumber}
        city={city}
        street={street}
        number={number}
      />

      <Tabs />

      <Route path="/*/(\\d+)" exact>
        <Wrapper>
          <div>
            <Comments />
            <Tags />
            <Information
              style={{ paddingTop: '32px' }}
              square={square || 'Данные обновляются'}
              numberOfLiving={numberOfLiving || 'Данные обновляются'}
              normativeNumberOfLiving={
                normativeNumberOfLiving || 'Данные обновляются'
              }
            />
            <Owners homeowners={homeowners} />
          </div>

          <div>
            <Tasks tasksList={tasksList} />
          </div>
        </Wrapper>
      </Route>

      <Route path="/*/(\\d+)/testimony" exact>
        <ApartmentDevices devices={devices} />
      </Route>
    </>,
  );
};

export { ApartmentProfile };
