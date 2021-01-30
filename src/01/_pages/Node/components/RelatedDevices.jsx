import React, { useContext } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { NodeContext } from '../index';
import { InputTT, IconTT } from "../../../tt-components";

export const RelatedDevices = () => {
  const { calculator } = useContext(NodeContext);
  const { hubConnection } = calculator;

  console.log(calculator,"calculator")

  const {
    calculatorModel,
    calculatorSerialNumber,
    futureCheckingDate,
    closingdate,
    calculatorId,
  } = hubConnection || {};

  const CalcItem = () => (
    <ListItem key={calculatorId}>
      <NavLink to={`/calculators/${calculatorId}`}>
        <NameWrap>
          <IconTT icon={"coldwatersupply"}/>
          <Name>{calculatorModel || 'Вычислитель'}</Name>
          <Serial>{` (${calculatorSerialNumber})`}</Serial>
        </NameWrap>
      </NavLink>
      <State>
        <InputTT icon="coldwatersupply" />
        {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
      </State>
      <Span>{convertDate(futureCheckingDate)}</Span>
    </ListItem>
  );

  return (
    <div>Test</div>
    // <ListWrap>
    //     <Title>Соединение с вычислителем</Title>
    //     <CalcItem />
    // </ListWrap>
  );
};

export default RelatedDevices;

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
