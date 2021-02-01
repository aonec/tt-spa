import React, { useContext } from 'react';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import { EditNodeContext } from '../index';
import { InputTT, IconTT } from "../../../tt-components";
import styled from 'styled-components'

export const Connection = () => {
  const { calculator } = useContext(EditNodeContext);
  console.log(calculator, "calculator")


  const { model, id, serialNumber, lastCheckingDate, futureCheckingDate, closingdate } = calculator
  console.log("lastCheckingDate", lastCheckingDate)

  const handleEdit = () => {
    console.log("handleEdit")
  }
  const CalcItem = () => (
    <ListItem key={id + serialNumber}>
      <NavLink to={`/calculators/${id}`}>
        <NameWrap>
          <IconTT icon="device" style={{ marginRight: '8px' }}/>
          <NameAndSerialNumber>
            <Name style={{ marginRight: '8px' }}>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
          </NameAndSerialNumber>
        </NameWrap>
      </NavLink>
      <State>
        {closingdate !== null ? <IconTT icon='green'/> : <IconTT icon='red'/>}
        {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
      </State>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Dates>{lastCheckingDate !== null ? moment(lastCheckingDate).format('DD.MM.YYYY') : 'Дата поверки не указана'} - {futureCheckingDate !== null ? moment(futureCheckingDate).format('DD.MM.YYYY') : 'Следующая Дата поверки не указана'}</Dates>
        <IconTT icon='edit' onClick={handleEdit} style={{marginLeft:8}}/>
      </div>

    </ListItem>
  );

  return (
    <ListWrap>
      <Title>Соединение с вычислителем</Title>
      <CalcItem/>
    </ListWrap>
  );
};

export default Connection;

export const Template = styled.div``;

export const NameWrap = styled.div`
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

export const NameAndSerialNumber = styled.div`
  display: inline-flex;
  align-items: center;
`
export const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Serial = styled.p`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
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
  grid-template-columns: 4fr 2fr 6fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;

export const Dates = styled.span`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;
