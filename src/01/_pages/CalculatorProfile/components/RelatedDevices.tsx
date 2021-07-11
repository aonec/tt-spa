import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { IconTT } from '../../../tt-components';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';

interface RelatedDevicesInterface {
  device: CalculatorResponse | null;
}

export const NodeRelatedDevices = ({ device }: RelatedDevicesInterface) => {
  if (!device) {
    return null;
  }
  const { nodes } = device;
  if (!nodes) {
    return null;
  }

  const resultDevices = nodes.map((node) => {
    const { communicationPipes } = node;

    const related = _.flatten(
      communicationPipes?.map((item, index) => {
        const { devices } = item;
        return devices;
      }),
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

      const { pipeNumber = '', entryNumber = '' } = hub || {
        pipeNumber: '',
        entryNumber: '',
      };

      const icon = !closingDate ? 'green' : 'red';
      const state = !closingDate ? 'Активен' : 'Не активен';

      return (
        <ListItem key={id}>
          <NameWrap href={`/housingMeteringDevices/${id}`}>
            <IconTT
              icon={(resource || 'next').toLowerCase()}
              style={{ marginRight: 8 }}
            />
            <Name style={{ marginRight: 8 }}>{model}</Name>
            <Serial>{` (${serialNumber})`}</Serial>
          </NameWrap>

          <State>
            <IconTT icon={icon} />
            {state}
          </State>
          <Span>{`Ввод: ${entryNumber ?? ''}`}</Span>
          <Span>{`Труба: ${pipeNumber ?? ''}`}</Span>
        </ListItem>
      );
    });
    return result;
  });

  return <ListWrap>{resultDevices}</ListWrap>;
};

export default NodeRelatedDevices;

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

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-primary);
`;

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
