import React, { useContext, useState, useEffect } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import styled from 'styled-components';
import { Loader } from '01/components';
import { Icon } from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { HousingContext, HousingProfile } from '../HousingProfile';
import { getInfo } from '../../../_api/device_page';
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from './Templates';

export const Template = styled.div``;

export const NameWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 6fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

export const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

export const Title = styled.h2``;

export const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 3fr 3fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;

export const RelatedDevices = () => {
  const {
    related, loadings,
  } = useContext(
    HousingContext,
  );

  const isLoading = _.get(loadings, 'related', true);

  const {
    calculatorModel,
    calculatorSerialNumber,
    futureCheckingDate,
    closingdate,
    calculatorId,
  } = related || {};

  const { icon, color } = DeviceIcons.null || {};

  const CalcItem = () => (
    <ListItem key={calculatorId}>
      <NavLink to={`/calculators/${calculatorId}`}>
        <NameWrap>
          <Icon icon={icon} color={color} />
          <Name>{calculatorModel || 'Вычислитель'}</Name>
          <Serial>{` (${calculatorSerialNumber})`}</Serial>
        </NameWrap>
      </NavLink>
      <State>
        <Icon icon="status" color="#17B45A" />
        {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
      </State>
      <Span>{convertDate(futureCheckingDate)}</Span>
    </ListItem>
  );

  const buttonHandler = () => {
    console.log('buttonHandler');
  };
  return (
    <ListWrap>
      {/* <button onClick={buttonHandler}>related</button> */}
      <Loader show={isLoading} size="32">
        <Title>Соединение с вычислителем</Title>
        <CalcItem />
      </Loader>
    </ListWrap>
  );
};

export default RelatedDevices;
