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
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { IncorrectConfigurationIcon } from 'ui-kit/icons';

export const TaskPipeNodeInfo: FC<TaskPipeNodeInfoProps> = ({ pipeNode }) => {
  const { resource, title, id } = pipeNode;

  const navigate = useNavigate();

  const isIncorrectConfig =
    (pipeNode?.validationResult?.errors || []).length !== 0 ||
    (pipeNode?.validationResult?.warnings || []).length !== 0;

  return (
    <Wrapper>
      <TitleWrapper>Статистика</TitleWrapper>

      <StatisticWrapper>
        <GroupWrapper>
          <ResourceIconLookup resource={resource} />
          <TextWrapper>Узел {title}</TextWrapper>

          {isIncorrectConfig && (
            <Tooltip title="Ошибка конфигурации узла">
              <IncorrectConfigurationIcon />
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
