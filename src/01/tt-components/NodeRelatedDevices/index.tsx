import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { PipeNodeResponse } from '../../../myApi';
import IconTT from '../IconTT';
import { Link } from 'react-router-dom';
import { getHousingMeteringDevice } from '../../_pages/HousingProfile/apiHousingProfile';
import { Loader } from '../../components';
import { magistrals } from '../localBases';

interface NodesInterface {
  node: PipeNodeResponse;
  edit?: boolean;
  close?: boolean;
  setDeregisterDeviceValue?: any;
  setDeregisterDevice?: Dispatch<SetStateAction<boolean>>;
}

export const NodeRelatedDevices = ({
  node,
  edit = false,
  close = false,
  setDeregisterDeviceValue,
  setDeregisterDevice,
}: NodesInterface) => {
  if (!node) {
    return <Loader show size={32} />;
  }
  const { communicationPipes } = node;

  if (!communicationPipes || communicationPipes.length < 1) {
    return <div>Нет устройств на узле</div>;
  }

  const related = communicationPipes.map((item, index) => {
    const { devices } = item;
    return devices;
  });

  const flattenRelated = _.flatten(related.filter((item) => item !== null));

  const result = flattenRelated.map((value: any) => {
    const { model, serialNumber, closingDate, hub, resource, id } = value;

    const { pipeNumber = '', entryNumber = '', magistral = '' } = hub || {
      pipeNumber: '',
      entryNumber: '',
    };

    const direction = magistrals.find((item) => item.value === magistral);
    const directionLabel = direction
      ? direction.label
      : 'Направление магистрали не указано';

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

        <ConnectionProps>
          <Span>{`Ввод: ${entryNumber ?? ''}`}</Span>
          <Span>{`Труба: ${pipeNumber ?? ''}`}</Span>
        </ConnectionProps>
        <MagistralProps>
          <Span>{`Магистраль: ${directionLabel}`} </Span>
        </MagistralProps>
        <EditOptions>
          {edit ? (
            <Link
              to={`/housingMeteringDevices/${id}/edit_odpu`}
              title="Редактирование ОДПУ"
              style={{ display: 'inline-flex', width: 'min-content' }}
            >
              <IconTT icon="edit" />
            </Link>
          ) : null}
          {close ? (
            <IconTT
              icon="del"
              style={{ marginLeft: 8, cursor: 'pointer' }}
              onClick={() => {
                if (setDeregisterDeviceValue) {
                  getHousingMeteringDevice(id).then((res) => {
                    setDeregisterDeviceValue(res);
                  });
                }
                if (setDeregisterDevice) {
                  setDeregisterDevice(true);
                }
              }}
            />
          ) : null}
        </EditOptions>
      </ListItem>
    );
  });

  return <ListWrap>{result}</ListWrap>;
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

const ConnectionProps = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: auto 1fr;
  justify-self: flex-end;
`;
const EditOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: center;
`;

const ListWrap = styled.div`
  display: grid;
  height: min-content;
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 3fr 4fr;
  grid-gap: 4px;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
const MagistralProps = styled.div`
  justify-self: center;
`;
