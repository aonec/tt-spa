import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { IconTT } from '../../../tt-components';
import moment from 'moment';
import { Icon } from '../../../_components/Icon';

interface RelatedDevicesInterface {
  device: any;
}

export const RelatedDevices = ({ device }: RelatedDevicesInterface) => {
  if (!device) {
    return null;
  }

  const { hubConnection } = device;

  const {
    calculatorModel,
    calculatorSerialNumber,
    futureCheckingDate,
    closingDate,
    calculatorId,
  } = hubConnection || {};

  const CalcItem = () => (
    <ListItem key={calculatorId}>
      <NavLink to={`/calculators/${calculatorId}`}>
        <NameWrap>
          <IconTT icon={'device'} />
          <Name>{calculatorModel || 'Вычислитель'}</Name>
          <Serial>{` (${calculatorSerialNumber})`}</Serial>
        </NameWrap>
      </NavLink>
      <State>
        <Icon icon="status" color="#17B45A" />
        {`${closingDate ? 'Не активен' : 'Активен'}`}
      </State>
      <Span>{moment(futureCheckingDate).format('DD.MM.YYYY')}</Span>
    </ListItem>
  );

  return (
    <ListWrap>
      <CalcItem />
    </ListWrap>
  );
};

export default RelatedDevices;

export const Template = styled.div``;

export const NameWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  grid-column-gap: 8px;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

const Title = styled.h2``;

const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 3fr 3fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;

const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
