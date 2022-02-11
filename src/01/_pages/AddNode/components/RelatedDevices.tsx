import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { IconTT } from '../../../tt-components';
import { AddNodeContext } from '../AddNodeContext';

interface PipeInterface {
  calculatorId: number;
  entryNumber: number;
  magistral: string;
  pipeNumber: number;
}

interface DeviceInterface {
  diameter: number;
  documentsIds: Array<any>;
  futureCheckingDate: string;
  futureCommercialAccountingDate: string;
  housingMeteringDeviceType: string;
  lastCheckingDate: string;
  lastCommercialAccountingDate: string;
  model: string;
  pipe: PipeInterface;
  resource: string;
  serialNumber: string;
  value?: string;
}

export const RelatedDevices = () => {
  const { communicationPipes, setCommunicationPipes } = useContext(
    AddNodeContext
  );

  if (!communicationPipes) {
    return null;
  }

  const flattenDevices: Array<DeviceInterface> = _.flatten(
    communicationPipes.map((communicationPipe: any) => {
      const { devices } = communicationPipe;
      return devices.map((device: any) => device);
    })
  );

  const result = flattenDevices.map((device: DeviceInterface) => {
    const { model, serialNumber, resource, pipe } = device;
    const { pipeNumber, entryNumber } = pipe;

    function handleDelete() {
      const updatedCommunicationPipes = communicationPipes.map(
        (communicationPipe: any) => {
          const { devices } = communicationPipe;

          const devicesList = _.filter(
            devices,
            (deviceInList) => !_.isEqual(deviceInList, device)
          );
          return { ...communicationPipe, devices: devicesList };
        }
      );

      const newCommunicationPipes = _.filter(
        updatedCommunicationPipes,
        (communicationPipe) => communicationPipe.devices.length > 0
      );

      setCommunicationPipes(newCommunicationPipes);
    }

    return (
      <ListItem key={serialNumber}>
        <NameWrap>
          <IconTT icon={resource.toLowerCase()} />
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <Span>{`Ввод: ${entryNumber}`}</Span>
        <Span>{`Труба: ${pipeNumber}`}</Span>
        <Div>
          {/* <IconTT icon="edit" style={{ marginLeft: 8 }} onClick={handleEdit} /> */}
          <IconTT
            icon="close"
            style={{ marginLeft: 8 }}
            onClick={handleDelete}
          />
        </Div>
      </ListItem>
    );
  });

  return <ListWrap>{result}</ListWrap>;
};

export default RelatedDevices;

const Div = styled.div`
  display: inline-flex;
  align-items: center;
`;

const NameWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-gap: 8px;
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
  color: var(--main-60);
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
  grid-template-columns: 7.5fr 1.5fr 1.5fr 1.5fr;
  grid-gap: 8px;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;

// const newArr = communicationPipes.reduce((result, communicationPipe) => {
//     const {devices, number} = communicationPipe;
//
//     if (condition === true) {
//         result.push({something});
//     }
//
//     return result;
// }, []);
