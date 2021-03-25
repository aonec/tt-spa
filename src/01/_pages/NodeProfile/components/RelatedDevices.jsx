import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { NodeContext } from '../index';
import { IconTT } from '../../../tt-components';

export const RelatedDevices = () => {
  const { node } = useContext(NodeContext);
  const { communicationPipes } = node;

  const related = _.flatten(
    communicationPipes.map((item, index) => {
      const res = item.devices.map((resItem) => resItem);
      return res;
    })
  );

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

    const { pipeNumber, entryNumber, hubNumber } =
      hub === null
        ? {
            number: 'X',
            entryNumber: 'X',
            hubNumber: 'X',
          }
        : hub;

    const icon = closingdate !== null ? 'green' : 'red';
    const status = closingdate !== null ? 'Активен' : 'Не активен';

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <IconTT
            icon={resource.toLowerCase()}
            style={{ marginRight: '8px' }}
          />
          <Name style={{ marginRight: '8px' }}>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          <IconTT icon={icon} />
          {status}
        </State>
        <Span>{`Ввод: ${entryNumber ?? 'Х'}`}</Span>
        {/*<Span>{`Узел: ${hubNumber ?? 'Х'}`}</Span>*/}
        <Span>{`Труба: ${pipeNumber ?? 'Х'}`}</Span>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      <Title>Приборы</Title>
      {result}
    </ListWrap>
  );
};

export default RelatedDevices;

const Template = styled.div``;

const NameWrap = styled.a`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;

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
  grid-template-columns: 5.5fr 2fr 1.5fr 1.5fr 1.5fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
