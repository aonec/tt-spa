import { Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { TaskProfileProps } from './TaskProfile.types';
import { TaskProfileHeader } from './TaskProfileHeader';

export const TaskProfile: FC<TaskProfileProps> = ({ task, isLoading }) => {
  const { closingStatus, individualDevices, device, name: taskName } = task;

  const timeline = createTimeline(task);
  const timer = createTimer(task);

  const name = useMemo(() => {
    if (!closingStatus) {
      return task.currentStage?.name;
    }
    return task.name;
  }, [task]);

  return (
    <div>
      <GoBack />
      {isLoading && <Skeleton active />}
      {!isLoading && name && (
        <TaskProfileHeader
          name={name}
          devices={individualDevices || []}
          timeline={timeline}
          nodeDevice={device}
          timer={timer}
          taskName={taskName || ''}
        />
      )}
    </div>
  );
};
