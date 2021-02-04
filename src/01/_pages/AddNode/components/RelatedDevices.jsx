import React, { useContext } from 'react';
import styled from 'styled-components';
import { Icon } from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import { IconTT } from "../../../tt-components";
import { Div } from "../../EditNode/components/Connection";

export const RelatedDevices = (props) => {

  console.log(props)

  const {
    housingStock,
    addCalculator,
    setAddCalculator,
    calculators,
    currentCalculatorId,
    setCurrentCalculatorId,
    setAddOdpu,
    addOdpu,
    devices,
    setDevices
  } = props;

  const result = devices.map((value) => {
    const {
      model,
      serialNumber,
      closingdate,
      hub,
      resource,
      id,
      pipe,
      housingStockId,
    } = value;

    const { pipeNumber, entryNumber, hubNumber } = pipe

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <IconTT icon={resource.toLowerCase()}/>
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          <Icon icon="status" color="#17B45A"/>
          {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
        </State>
        <Span>{`Ввод: ${entryNumber}`}</Span>
        {/*<Span>{`Узел: ${hubNumber}`}</Span>*/}
        <Span>{`Труба: ${pipeNumber}`}</Span>
        <Div> <IconTT icon={'edit'} style={{ marginLeft: 8 }}/>
          <IconTT icon={'del'} style={{ marginLeft: 8 }}/></Div>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      {/* <button onClick={buttonHandler}>related</button> */}
      {result}
    </ListWrap>
  );
};

export default RelatedDevices;

export const Template = styled.div``;

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 7fr 4fr;
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
  grid-template-columns: 5.5fr 2fr 1.5fr 1.5fr 1.5fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
