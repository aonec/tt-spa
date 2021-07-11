import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import styled from 'reshadow/macro';
import styledComponents from 'styled-components';
import { grid } from '01/r_comp';
import { Loader } from '01/components/Loader';
import {
  getApartment,
  getTasks,
  getApartmentDevices,
} from './apiApartmentProfile';
import { Tabs } from './components/Tabs';
import Owners from './components/Owners';
import { Comments, Header, Tags, Information } from './components';

import { Tasks } from './components/ApartmentTasks/ApartmentTasks';

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';
import Index from '../../tt-components/Breadcrumb';
import { useAsync } from '../../hooks/useAsync';

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const { data, status, run } = useAsync();

  useEffect(() => {
    const request = () =>
      Promise.all([
        getApartment(apartmentId),
        getTasks(apartmentId),
        getApartmentDevices(apartmentId),
      ]);

    run(request());
  }, []);

  if (!data) return null;
  const [apartment, tasks, devices] = data;

  if (status === 'error') return 'ОШИБКА ЗАГРУЗКИ';
  if (status === 'loading') return <Loader show size="32" />;

  const Wrapper = styledComponents.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  padding-bottom: 40px;
`;
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

  const { city, street, number, id } = housingStock;

  return styled(grid)(
    <>
      <Index path={`/objects/${id}/apartments`} />
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
