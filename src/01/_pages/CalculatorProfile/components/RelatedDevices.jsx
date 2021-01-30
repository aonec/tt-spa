import React, { useContext } from 'react';
import styled from 'styled-components';
import { Loader } from '01/components';
import { Icon } from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import _ from 'lodash';
import { DeviceContext } from '../CalculatorProfile';

export const RelatedDevices = () => {
  const { related, loadings } = useContext(DeviceContext);
  const loading = _.get(loadings, 'related', true);

  const result = related.map((value) => {
    const {
      model,
      serialNumber,
      closingdate,
      hub,
      resource,
      id,
      housingStockId,
    } = value;

    const { pipeNumber, entryNumber, hubNumber } = hub === null ? {
      number: 'X',
      entryNumber: 'X',
      hubNumber: 'X'
    } : hub;
    const { icon, color } = DeviceIcons[resource];

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <Icon icon={icon} color={color}/>
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          <Icon icon="status" color="#17B45A"/>
          {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
        </State>
        <Span>{`Ввод: ${entryNumber}`}</Span>
        <Span>{`Узел: ${hubNumber}`}</Span>
        <Span>{`Труба: ${pipeNumber}`}</Span>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      {/* <button onClick={buttonHandler}>related</button> */}
      <Loader show={loading} size="32">
        <Title>Приборы</Title>
        {result}
      </Loader>
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
