import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  GroupWrapper,
  GoTo,
  StatisticWrapper,
  TextWrapper,
  TitleWrapper,
  Wrapper,
} from './TaskPipeNodeInfo.styled';
import { TaskPipeNodeInfoProps } from './TaskPipeNodeInfo.types';
import { useNavigate } from 'react-router-dom';
import { EConnectionStatusType } from 'api/types';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { CheckConnection, NoConnectionIcon, WarningIcon } from 'ui-kit/icons';

export const TaskPipeNodeInfo: FC<TaskPipeNodeInfoProps> = ({ pipeNode }) => {
  const { resource, title, id, calculator } = pipeNode;

  const navigate = useNavigate();

  const isConnectionError = !(
    calculator?.connection?.port && calculator?.connection?.ipV4
  );

  const isMalfunction =
    calculator?.connectionInfo?.connectionStatus ===
    EConnectionStatusType.DeviceMalfunction;

  const isConnected = calculator?.isConnected;

  return (
    <Wrapper>
      <TitleWrapper>Статистика</TitleWrapper>

      <StatisticWrapper>
        <GroupWrapper>
          <ResourceIconLookup resource={resource} />
          <TextWrapper>Узел {title}</TextWrapper>
          {!isConnected && (
            <Tooltip title="Вычислитель не опрашивается">
              <NoConnectionIcon />
            </Tooltip>
          )}
          {isConnected && isConnectionError && (
            <Tooltip title="Проверьте настройки соединения">
              <CheckConnection />
            </Tooltip>
          )}
          {isMalfunction && (
            <Tooltip title="Вычислитель неисправен">
              <WarningIcon />
            </Tooltip>
          )}
        </GroupWrapper>
        <GroupWrapper>
          <GoTo
            onClick={() => navigate(`/nodes/${id}/stats`)}
            data-test="task-pipe-node-link"
          >
            Перейти {'>'}
          </GoTo>
        </GroupWrapper>
      </StatisticWrapper>
    </Wrapper>
  );
};
