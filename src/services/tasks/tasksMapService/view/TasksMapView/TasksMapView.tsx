import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import {
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
} from '@pbe/react-yandex-maps';
import { getTaskIcon } from './TasksMapView.utils';
import { TasksMapFiltration } from './TasksMapFiltration';

export const TasksMapView: FC<TasksMapViewProps> = ({ tasks, taskTypes }) => {
  const data = tasks[0]?.housingStockCoordinates;

  return (
    <Wrapper>
      <TasksMapFiltration taskTypes={taskTypes} />
      <Map
        width={'100%'}
        height={'calc(100vh - 130px)'}
        defaultState={{
          center: [data?.latitude || 55.75, data?.longitude || 37.57],
          zoom: 14,
        }}
        onLoad={(api) => console.log(api)}
      >
        {tasks.map((task) => (
          <Placemark
            key={task.id}
            defaultGeometry={
              task.housingStockCoordinates
                ? [
                    task.housingStockCoordinates.latitude,
                    task.housingStockCoordinates.longitude,
                  ]
                : undefined
            }
            options={{
              iconLayout: 'default#image',
              iconImageHref: getTaskIcon(task.devices) || undefined,
              iconImageSize: [52, 52],
            }}
          />
        ))}
        <FullscreenControl />
        <ZoomControl
          options={{
            position: {
              top: 50,
              right: 10,
            },
          }}
        />
      </Map>
    </Wrapper>
  );
};
