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
import { Header, Information } from './components';

// Получаем типовые функции по запросам к серверу
import { useAsync } from '../../hooks/useAsync';

import { ApartmentGate } from '01/features/apartments/displayApartment/models';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';
import { ActsCardContainer } from 'services/apartments/actsCardService';
import { CardsWrapper, InformationWrapper } from './ApartmentProfile.styled';
import { TasksCardContainer } from 'services/apartments/tasksCardService';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';

const ApartmentProfile = () => {
  const { apartmentId, housingStockId } = useParams<{
    housingStockId: string;
    apartmentId: string;
    apartmentSection: 'testimony' | 'homeowners' | 'documents' | 'actsJournal';
  }>();

  const { data, status, run }: any = useAsync();

  useEffect(() => {
    const request = () =>
      Promise.all([
        getApartment(Number(apartmentId)),
        getTasks(Number(apartmentId)),
        getApartmentDevices(apartmentId),
      ]);

    run(request());
  }, []);

  if (!data) return null;

  const apartment = data[0];

  if (status === 'error') return 'ОШИБКА ЗАГРУЗКИ';
  if (status === 'loading') return <Loader show size="32" />;

  const Wrapper = styledComponents.div`
  margin-top: 25px;
  display: flex;
  padding-bottom: 40px;
  max-width: 1300px;
  min-width: 800px;
  `;
  // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const {
    id,
    activeTaskIds,
    square,
    numberOfLiving,
    normativeNumberOfLiving,
    homeownerAccounts,
    coldWaterRiserCount,
  } = apartment;

  const tasksNumber = activeTaskIds.length;

  return styled(grid)(
    <>
      <GoBack />
      <ApartmentGate id={Number(apartmentId)} />
      <Header apartment={apartment} />

      <Tabs />
      <Wrapper>
        <Route path="/*/:apartmentId/testimony" exact>
          <ApartmentIndividualDevicesMetersContainer
            maxWidth={860}
            apartmentId={id}
            editable={false}
          />
        </Route>
        <Route path="/*/:apartmentId/homeowners" exact>
          <Owners homeownerAccounts={homeownerAccounts} />
        </Route>
        <Route path="/*/:apartmentId/actsJournal" exact>
          <ApartmentActsListContainer />
        </Route>
        <Route path="/objects/:id/apartments/:apartmentId" exact>
          <InformationWrapper>
            <Information
              square={square}
              numberOfLiving={numberOfLiving}
              normativeNumberOfLiving={normativeNumberOfLiving}
              coldWaterRiserCount={coldWaterRiserCount}
            />
          </InformationWrapper>
        </Route>
        <CardsWrapper>
          <TasksCardContainer
            apartmentId={apartmentId}
            tasksNumber={tasksNumber}
          />
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
