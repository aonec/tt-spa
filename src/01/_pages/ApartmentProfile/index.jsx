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

// Получаем типовые функции по запросам к серверу
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';
import { useAsync } from '../../hooks/useAsync';

import { ApartmentGate } from '01/features/apartments/displayApartment/models';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';
import { ActsCardContainer } from 'services/apartments/actsCardService';
import { CardsWrapper } from './ApartmentProfile.styled';

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];
  const housingStockId = params[0];

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
  display: flex;
  padding-bottom: 40px;
`;
  // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const {
    apartmentNumber,
    square,
    numberOfLiving,
    normativeNumberOfLiving,
    homeownerAccounts,
  } = apartment;

  return styled(grid)(
    <>
      <GoBack />
      <ApartmentGate id={Number(apartmentId)} />
      <Header apartment={apartment} />

      <Tabs />
      <Wrapper>
        <Route path="/*/:apartmentId/testimony" exact>
          <ApartmentDevices devices={devices} />
        </Route>

        <Route path="/*/:apartmentId/actsJournal" exact>
          <ApartmentActsListContainer />
        </Route>
        <Route path="/objects/:id/apartments/:apartmentId" exact>
          <div>
            <Information
              style={{ paddingTop: '32px' }}
              square={square}
              numberOfLiving={numberOfLiving}
              normativeNumberOfLiving={normativeNumberOfLiving}
            />
            <Owners homeownerAccounts={homeownerAccounts} />
          </div>
        </Route>
        <CardsWrapper>
          <ActsCardContainer
            apartmentId={apartmentId}
            housingStockId={housingStockId}
          />
        </CardsWrapper>
      </Wrapper>
    </>
  );
};

export { ApartmentProfile };
