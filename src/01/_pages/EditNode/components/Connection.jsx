import React, { useContext } from 'react';
import moment from 'moment';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { EditNodeContext } from '../index';
import { IconTT } from '../../../tt-components';

const Connection = () => {
  const { calculator } = useContext(EditNodeContext);
  const {
    model, id, serialNumber, lastCheckingDate, futureCheckingDate, closingdate,
  } = calculator;

  const lastCheckingDateText = lastCheckingDate !== null ? moment(lastCheckingDate).format('DD.MM.YYYY') : 'Дата поверки не указана';
  const futureCheckingDateText = futureCheckingDate !== null ? moment(futureCheckingDate).format('DD.MM.YYYY') : 'Следующая Дата поверки не указана';
  const icon = closingdate !== null ? 'green' : 'red';
  const status = closingdate !== null ? 'Активен' : 'Не активен';
  return (
    <CalcListItem key={id + serialNumber}>
      <NavLink to={`/calculators/${id}`}>
        <NameWrap>
          <IconTT icon="device" />
          <NameAndSerialNumber>
            <Name style={{ marginRight: '8px' }}>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
          </NameAndSerialNumber>
        </NameWrap>
      </NavLink>
      <State>
        <IconTT icon={icon} />
        {status}
      </State>
      <Div>
        <Dates>{`${lastCheckingDateText} - ${futureCheckingDateText}`}</Dates>
        <Link
          to={`/calculators/${id}/edit`}
          style={{ display: 'inline-flex', width: 'fit-content' }}
          title="Редактирование Вычислителя"
        >
          <IconTT icon="edit" style={{ marginLeft: 8 }} />
        </Link>
        <Link
          to={`/calculators/${id}/edit`}
          style={{ display: 'inline-flex' }}
          title="Редактирование Вычислителя"
        >
          <IconTT
            icon="del"
            style={{ marginLeft: 8 }}
          />
        </Link>
      </Div>
    </CalcListItem>
  );
};

export default Connection;

const Template = styled.div``;

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

const Div = styled.div`
  display: inline-flex;
  align-items: center;
`;

const CalcListItem = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr 4fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;

const NameAndSerialNumber = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 8px;
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

const Dates = styled.span`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;
