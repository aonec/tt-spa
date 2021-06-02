import React, { Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { NodeResponse } from '../../../myApi';
import IconTT from '../IconTT';
import { getCalculator } from './apiNodeConnection';

interface ConnectionInterface {
  // calculator: CalculatorIntoNodeResponse;
  node: NodeResponse;
  edit: boolean;
  setDeregisterDeviceValue?: any;
  setDeregisterDevice?: Dispatch<SetStateAction<boolean>>;
}

const NodeConnection = ({
  node,
  edit = false,
  setDeregisterDeviceValue,
  setDeregisterDevice,
}: ConnectionInterface) => {
  const { calculator } = node;

  if (!calculator) return null;
  const {
    model,
    id,
    serialNumber,
    lastCheckingDate,
    futureCheckingDate,
    closingDate,
  } = calculator;

  const lastCheckingDateText = lastCheckingDate
    ? moment(lastCheckingDate).format('DD.MM.YYYY')
    : 'Дата поверки не указана';
  const futureCheckingDateText = futureCheckingDate
    ? moment(futureCheckingDate).format('DD.MM.YYYY')
    : 'Следующая Дата поверки не указана';
  const icon = closingDate ? 'red' : 'green';
  const status = closingDate ? 'Не активен' : 'Активен';
  return (
    <ListItem>
      <NavLink to={`/calculators/${id}`}>
        <NameWrap>
          <IconTT icon="device" />
          <NameAndSerialNumber>
            <Name style={{ marginRight: 8 }}>{model}</Name>
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
      </Div>

      <div>
        {edit ? (
          <>
            <Link
              to={`/calculators/${id}/edit`}
              style={{ display: 'inline-flex', width: 'fit-content' }}
              title="Редактирование Вычислителя"
            >
              <IconTT icon="edit" style={{ marginLeft: 8 }} />
            </Link>

            <IconTT
              icon="del"
              style={{ marginLeft: 8, cursor: 'pointer' }}
              onClick={() => {
                if (setDeregisterDeviceValue) {
                  getCalculator(id).then((res) => {
                    setDeregisterDeviceValue(res);
                  });
                }
                if (setDeregisterDevice) {
                  setDeregisterDevice(true);
                }
              }}
            />
          </>
        ) : null}
      </div>
    </ListItem>
  );
};

export default NodeConnection;

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
  justify-self: flex-end;
`;

const ListItem = styled.div`
  width: 100%;
  display: grid;
  height: fit-content;
  grid-template-columns: 5fr 2fr 3fr 2fr;
  grid-gap: 8px;
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
