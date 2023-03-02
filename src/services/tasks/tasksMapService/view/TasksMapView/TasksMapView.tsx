import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import {
  Map,
  FullscreenControl,
  ZoomControl,
  Placemark,
} from '@pbe/react-yandex-maps';
import { TasksMapFiltration } from './TasksMapFiltration';
import { ResourcesPlacemarksLookup } from './TasksMapView.constants';

export const TasksMapView: FC<TasksMapViewProps> = ({
  taskTypes,
  housingStocksWithTasks,
  applyFilters,
  filtrationValues,
  resetFilters,
}) => {
  const center = [
    housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude || 55.75,
    housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude || 37.57,
  ];

  return (
    <Wrapper>
      <TasksMapFiltration
        taskTypes={taskTypes}
        applyFilters={applyFilters}
        filtrationValues={filtrationValues}
        resetFilters={resetFilters}
      />
      <Map
        width={'100%'}
        height={'calc(100vh - 130px)'}
        defaultState={{
          center,
          zoom: 16,
        }}
      >
        {housingStocksWithTasks.map((housingStockWithTask) => {
          const textPosition =
            String(housingStockWithTask.tasks?.length).length === 2 ? 23 : 25.6;

          const firtsTask = housingStockWithTask.tasks?.find((elem) =>
            Boolean(elem.resourceTypes),
          );

          const placemarkSvgCodeText = firtsTask?.resourceTypes
            ? ResourcesPlacemarksLookup[firtsTask.resourceTypes?.[0]]
            : '';

          const svgCodeText = `<svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">${placemarkSvgCodeText}<path d="M21 8C21 4.13401 24.134 1 28 1C31.866 1 35 4.13401 35 8C35 11.866 31.866 15 28 15C24.134 15 21 11.866 21 8Z" fill="#272F5A" stroke="#272F5A" stroke-width="2"/>
<text x="${textPosition}px" y="11px" font-family="PTRootUIWeb" fill="white" style="font: 9px sans-serif;">${housingStockWithTask.tasks?.length}</text>
</svg>`;

          const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

          return (
            <Placemark
              key={housingStockWithTask.housingStock?.id}
              defaultGeometry={
                housingStockWithTask.housingStock?.coordinates
                  ? [
                      housingStockWithTask.housingStock?.coordinates.latitude,
                      housingStockWithTask.housingStock?.coordinates.longitude,
                    ]
                  : undefined
              }
              options={{
                iconLayout: 'default#image',
                iconImageHref: iconHrev,
                iconImageSize: [52, 52],
              }}
            ></Placemark>
          );
        })}
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
