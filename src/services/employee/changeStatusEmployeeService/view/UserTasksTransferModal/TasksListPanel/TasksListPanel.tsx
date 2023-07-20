import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Description,
  Header,
  ListWrapper,
  Title,
  Wrapper,
} from './TasksListPanel.styled';
import { TasksListPanelProps } from './TasksListPanel.types';
import { TimerIcon } from 'ui-kit/icons';
import { ListOpeningChevron } from 'ui-kit/shared_components/ListOpeningChevron';
import { prepareData } from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { TaskGroupingFilter } from 'api/myApi';
import { TasksList } from 'services/tasks/tasksProfileService/view/TasksList';
import { TaskType } from 'services/tasks/tasksProfileService/view/TasksListItem/TasksListItem.types';
import { getCountText } from 'utils/getCountText';
import { tasksCountTexts } from './TasksListPanel.constants';

export const TasksListPanel: FC<TasksListPanelProps> = ({
  filteredTasks,
  selectedRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tasksCountText = Boolean(filteredTasks.length)
    ? `${filteredTasks.length} ${getCountText(
        filteredTasks.length,
        tasksCountTexts,
      )}`
    : selectedRole
    ? 'Нет задач'
    : '';

  const preparedTasks = useMemo(
    () => prepareData(filteredTasks, TaskGroupingFilter.Executing),
    [filteredTasks],
  );

  useEffect(() => setIsOpen(false), [filteredTasks, setIsOpen]);

  return (
    <Wrapper>
      <Header>
        <Title>
          <TimerIcon />
          <div>Открытые задачи</div>
        </Title>
        <Description>
          <div>{tasksCountText}</div>
          {Boolean(filteredTasks.length) && (
            <ListOpeningChevron
              isOpen={isOpen}
              onClick={() => setIsOpen((p) => !p)}
            />
          )}
        </Description>
      </Header>

      {isOpen && (
        <ListWrapper>
          <TasksList tasks={preparedTasks as TaskType[]} />
        </ListWrapper>
      )}
    </Wrapper>
  );
};
