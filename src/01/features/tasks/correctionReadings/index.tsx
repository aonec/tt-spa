import {
  DeviceDataString,
  getResourceColor,
} from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { useReadings } from '01/hooks/useReadings';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import IsActive from '01/tt-components/IsActive';
import { translateMountPlace } from '01/utils/translateMountPlace';
import { DateLine } from '01/_components/DateLine/DateLine';
import { ReadingsHistoryButton } from '01/_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import { Form } from 'antd';
import { useStore } from 'effector-react';
import moment from 'moment';
import { EResourceType, IndividualDeviceResponse } from 'myApi';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { $task, fetchTaskFx, TaskGate } from '../displayTask/models';

export const CorrectionReadingsPanel = () => {
  const params = useParams<[string]>();

  const task = useStore($task);

  const device = task?.individualDevice!;
  const problemReading = device?.readings && device?.readings[0];

  const pending = useStore(fetchTaskFx.pending);

  const deviceDataString = (
    <Flex>
      <DeviceDataString device={device} />
      <Space w={5} />
      <IsActive closingDate={device?.closingDate} />
      <Space />
      <div>{translateMountPlace(device?.mountPlace)}</div>
      <Space />
      <DateLine
        lastCheckingDate={device?.lastCheckingDate}
        futureCheckingDate={device?.futureCheckingDate}
      />
      <Space />
      <ReadingsHistoryButton deviceId={device?.id} />
    </Flex>
  );

  const editTaskInfo = (
    <Grid
      temp="0.7fr 0.5fr 0.8fr 1.2fr"
      gap="15px"
      style={{ width: '100%', maxWidth: '900px' }}
    >
      <InfoBlock
        title="Некорректные показания"
        value={problemReading?.value1!}
        color="red"
      />
      <InfoBlock
        title="Период"
        value={moment(problemReading?.readingDate).format('MMMM YYYY')}
      />
      <InfoBlock title="Оператор" value={problemReading?.user?.name!} />
      <InfoBlock title="Причина ошибки" value={task?.creationReason!} />
    </Grid>
  );

  const inputReadings = device && (
    <>
      <Form.Item label="Исправленные показания">
        <ReadingsInput device={device} />
      </Form.Item>
    </>
  );

  return (
    <PendingLoader loading={pending}>
      <Wrap>
        <ReadingsHistoryModal />
        <TaskGate id={Number(params[0])} />
        <Header>Введите исправленные показния</Header>
        <Space />
        {deviceDataString}
        <Space />
        {editTaskInfo}
        <Space h={5} />
        {inputReadings}
      </Wrap>
    </PendingLoader>
  );
};

const Wrap = styled.div`
  padding: 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-size: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

interface InfoBlockData {
  title: string;
  value: string;
  color?: string;
}

const InfoBlock = ({ title, value, color }: InfoBlockData) => {
  return (
    <div>
      <InfoBlockTitle>{title}</InfoBlockTitle>
      <InfoBlockValue style={{ color }}>{value}</InfoBlockValue>
    </div>
  );
};

const InfoBlockTitle = styled.div`
  color: gray;
`;

const InfoBlockValue = styled.div`
  color: #000000dd;
  font-size: 16px;
  font-weight: 500;
`;

interface ReadingsInputProps {
  device: IndividualDeviceResponse;
}

export const ReadingsInput: React.FC<ReadingsInputProps> = ({ device }) => {
  return <ReadingInputStyled resource={device.resource} type="number" />;
};

const ReadingInputStyled = styled.input<{ resource: EResourceType }>`
  border: 1px solid ${({ resource }) => getResourceColor(resource)};
  border-left: 4px solid ${({ resource }) => getResourceColor(resource)};
  border-radius: 4px;
  padding: 4px 10px;
  width: 180px;
  transition: 0.2s;

  &:focus,
  &:hover {
    box-shadow: 0 5px 10px #00001522;
  }
`;
