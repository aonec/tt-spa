import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { $task, TaskGate } from '../displayTask/models';

export const CorrectionReadingsPanel = () => {
  const params = useParams<[string]>();

  const task = useStore($task);

  return (
    <Wrap>
      <TaskGate id={Number(params[0])} />
      <Header>Введите исправленные показния</Header>
      <Space />
      <DeviceDataString device={task?.individualDevice!} />
    </Wrap>
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
