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
import { Header, Tags, Information } from './components';

import { Tasks } from './components/ApartmentTasks/ApartmentTasks';

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';
import Index from '../../tt-components/Breadcrumb';
import { useAsync } from '../../hooks/useAsync';

import { ChecksHistory } from './components/ChecksHistory';
import { CheckApartmentModal } from '01/features/apartments/checkApartment';
import { ApartmentGate } from '01/features/apartments/displayApartment/models';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';

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
    homeownerAccounts,
  } = apartment;

  const { city, street, number, id } = housingStock;

  return styled(grid)(
    <>
      <Index path={`/objects/${id}/apartments`} />
      <CheckApartmentModal />
      <ApartmentGate id={Number(apartmentId)} />
      <Header
        apartmentNumber={apartmentNumber}
        city={city}
        street={street}
        number={number}
      />
      <Tabs />

      <Route path="/*/:apartmentId/testimony" exact>
        <ApartmentDevices devices={devices} />
      </Route>

      <Route path="/*/:apartmentId/checksHistory" exact>
        <ChecksHistory />
      </Route>

      <Route path="/*/:apartmentId/documents" exact>
        <ApartmentDocumentsListContainer />
      </Route>

      <Route path="/objects/:id/apartments/:apartmentId" exact>
        <Wrapper>
          <div>
            <Information
              style={{ paddingTop: '32px' }}
              square={square}
              numberOfLiving={numberOfLiving}
              normativeNumberOfLiving={normativeNumberOfLiving}
            />
            <Owners homeownerAccounts={homeownerAccounts} />
          </div>

          <div>
            <Tasks tasksList={tasksList} />
          </div>
        </Wrapper>
      </Route>

      <Route path="/*/:apartmentId/testimony" exact>
        <ApartmentDevices devices={devices} />
      </Route>

      <Route path="/*/:apartmentId/checksHistory" exact>
        <ChecksHistory />
      </Route>

      <Route path="/*/(\\d+)/documents" exact>
        <ApartmentActsListContainer />
      </Route>
    </>
  );
};

export { ApartmentProfile };
