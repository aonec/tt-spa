import React, { Dispatch, SetStateAction, useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { IconTT } from '../../../tt-components';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';

interface NodesInterface {
  node: NodeResponse;
  calculator?: CalculatorResponse | null;
  nodeId?: number;
  setAddOdpu?: Dispatch<SetStateAction<boolean>>;
}

export const RelatedDevices = ({ node }: NodesInterface) => {
  if (!node) {
    return null;
  }
  const { communicationPipes } = node;
  console.log('node', node);

  const related = _.flatten(
    communicationPipes?.map((item, index) => {
      const { devices } = item;
      const res = devices || [].map((resItem) => resItem);
      return res;
    })
  );

  const result = related.map((value: any) => {
    const {
      model,
      serialNumber,
      closingDate,
      hub,
      resource,
      id,
      housingStockId,
    } = value;

    const { pipeNumber = '', entryNumber = '', hubNumber = '' } = hub || {
      pipeNumber: '',
      entryNumber: '',
      hubNumber: '',
    };

    const icon = closingDate !== null ? 'green' : 'red';
    const status = closingDate !== null ? 'Активен' : 'Не активен';

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <IconTT
            icon={(resource || 'next').toLowerCase()}
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
