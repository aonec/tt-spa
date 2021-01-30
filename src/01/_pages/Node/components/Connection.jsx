import React, { useContext } from 'react';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import { NodeContext } from '../index';
import { InputTT, IconTT } from "../../../tt-components";
import styled from 'styled-components'

export const Connection = () => {
  const { calculator } = useContext(NodeContext);
  console.log(calculator,"calculator")


  const {model, id, serialNumber, lastCheckingDate, futureCheckingDate, closingdate} = calculator


  const CalcItem = () => (
    <ListItem key={id + serialNumber}>
      <NavLink to={`/calculators/${id}`}>
        <NameWrap>
          <IconTT icon="device" style={{marginRight: '8px'}}/>
          <NameAndSerialNumber>
            <Name style={{marginRight: '8px'}}>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
          </NameAndSerialNumber>
        </NameWrap>
      </NavLink>
      <State>
        {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
      </State>
      <Span>{moment(lastCheckingDate).format('DD.MM.YYYY')} - {moment(futureCheckingDate).format('DD.MM.YYYY')}</Span>
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

export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
