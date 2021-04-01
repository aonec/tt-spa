import React, { useContext, useState } from 'react';
import moment from 'moment';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CalculatorResponse } from '../../../myApi';
import ModalCalculatorDeregister from '../../_pages/EditNode/components/Modals/ModalCalculatorDeregister';
import IconTT from '../IconTT';

interface ConnectionInterface {
  calculator: CalculatorResponse;
  edit: boolean;
}

const NodeConnection = ({ calculator, edit = false }: ConnectionInterface) => {
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
  const [
    isDeregisterModalVisible,
    setIsDeregisterModalVisible,
  ] = useState<boolean>(false);
  return (
    <>
      <CalcListItem>
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
                  setIsDeregisterModalVisible(true);
                }}
              />
            </>
          ) : null}
        </Div>
      </CalcListItem>
      <ModalCalculatorDeregister
        visible={isDeregisterModalVisible}
        id={id}
        setVisible={setIsDeregisterModalVisible}
      />
    </>
  );
};

export default NodeConnection;

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
