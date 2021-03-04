import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { IconTT } from '../../../tt-components';
import { AddNodeContext } from '../index';

const Div = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const RelatedDevices = () => {
  const {
    handleCancel,
    currentTabKey,
    setTab,
    handleChangeTab,
    handleNext,
    node,
    setNode,
    housingStockId,
    calculators,
    addCalculator,
    setAddCalculator,
    addOdpu,
    setAddOdpu,
    communicationPipes,
    setCommunicationPipes,
    housingStock,
  } = useContext(AddNodeContext);

  const devices = communicationPipes.map((communicationPipe) => {
    const { devices } = communicationPipe;
    return devices.map((device) => device);
  });
  const res = _.flatten(devices);

  const result = res.map((device) => {
    const {
      model,
      serialNumber,
      closingdate,
      hub,
      resource,
      id,
      pipe,
      housingStockId,
      housingMeteringDeviceType,
    } = device;

    const { pipeNumber, entryNumber, hubNumber } = pipe;

    function handleEdit() {
      console.log('handleEdit');
    }

    function handleDelete() {
      console.log('handleDelete');
      console.log(pipeNumber, housingMeteringDeviceType);

      const newCommunicationPipes = communicationPipes.map((communicationPipe, index) => {
        const { devices, number } = communicationPipe;
        const getIndex = _.findIndex(devices, (o) => o.pipe.pipeNumber === pipeNumber);
        console.log(getIndex);
        if (getIndex > -1) {
          const modifiedDevices = _.remove(devices, (o) => o.pipe.pipeNumber !== pipeNumber);

          return { ...communicationPipe, devices: modifiedDevices };
        } return communicationPipe;
      });
      console.log('newCommunicationPipes', newCommunicationPipes);
      setCommunicationPipes(newCommunicationPipes);
    }

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <IconTT icon={resource.toLowerCase()} />
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <Span>{`Ввод: ${entryNumber}`}</Span>
        <Span>{`Труба: ${pipeNumber}`}</Span>
        <Div>
          {/*<IconTT icon="edit" style={{ marginLeft: 8 }} onClick={handleEdit} />*/}
          <IconTT icon="close" style={{ marginLeft: 8 }} onClick={handleDelete} />
        </Div>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      {result}
    </ListWrap>
  );
};

export default RelatedDevices;

const Template = styled.div``;

const NameWrap = styled.a`
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
