import React, { Dispatch, SetStateAction, useContext } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IconTT } from '../../../tt-components';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';

interface ConnectionInterface {
  node?: NodeResponse;
  calculator: CalculatorResponse | null;
  nodeId?: number;
  setAddOdpu?: Dispatch<SetStateAction<boolean>>;
}

export const Connection = ({ calculator }: ConnectionInterface) => {
  if (!calculator) {
    return null;
  }
  const {
    model,
    id,
    serialNumber,
    lastCheckingDate,
    futureCheckingDate,
    closingDate,
  } = calculator;

  const resLastCheckingDate = lastCheckingDate
    ? moment(lastCheckingDate).format('DD.MM.YYYY')
    : 'Дата поверки не указана';
  const resFutureCheckingDate = futureCheckingDate
    ? moment(futureCheckingDate).format('DD.MM.YYYY')
    : 'Следующая Дата поверки не указана';
  const icon = !closingDate ? 'green' : 'red';
  const state = !closingDate ? 'Активен' : 'Не активен';

  const CalcItem = () => (
    <ListItem>
      <NavLink to={`/calculators/${id}`}>
        <NameWrap>
          <IconTT icon="device" style={{ marginRight: '8px' }} />
          <NameAndSerialNumber>
            <Name style={{ marginRight: '8px' }}>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
          </NameAndSerialNumber>
        </NameWrap>
      </NavLink>
      <State>
        <IconTT icon={icon} />
        {state}
      </State>
      <Dates>{`${resLastCheckingDate} - ${resFutureCheckingDate}`}</Dates>
    </ListItem>
  );

  return (
    <ListWrap>
      <Title>Соединение с вычислителем</Title>
      <CalcItem />
    </ListWrap>
  );
};

export default Connection;

const NameWrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

const NameAndSerialNumber = styled.div`
  display: inline-flex;
  align-items: center;
`;
const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

const Serial = styled.p`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
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
  grid-template-columns: 4fr 2fr 6fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;

const Dates = styled.span`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;
