import React, { useState } from 'react';
import { Meta, ComponentStory } from '@storybook/react';
import { Segmented } from './Segmented';
import { TasksPageSegment } from 'services/tasks/tasksProfileService/view/TasksProfile/TasksProfile.types';
import { ListIcon, MapIcon } from 'ui-kit/icons';

const meta: Meta<typeof Segmented> = {
  title: 'Segmented',
  component: Segmented,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof Segmented> = () => {
  const [tasksPageSegment, setTasksPageSegment] =
    useState<TasksPageSegment>('list');

  return (
    <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
      <Segmented<TasksPageSegment>
        active={tasksPageSegment}
        items={[
          {
            title: 'Список',
            name: 'list',
            icon: <ListIcon />,
          },
          {
            title: 'На карте',
            name: 'map',
            icon: <MapIcon />,
          },
        ]}
        onChange={setTasksPageSegment}
      />
    </div>
  );
};
