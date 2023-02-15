import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { getTaskIcon } from './TasksMapView.utils';

export const TasksMapView: FC<TasksMapViewProps> = ({ tasks }) => {
  const data = tasks[0]?.housingStockCoordinates;

  return (
    <Wrapper>
      <Map
        width={'100%'}
        height={'780px'}
        defaultState={{
          center: [data?.latitude || 55.75, data?.longitude || 37.57],
          zoom: 14,
        }}
      >
        {tasks.map((task) => (
          <Placemark
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
      </Map>
    </Wrapper>
  );
};
