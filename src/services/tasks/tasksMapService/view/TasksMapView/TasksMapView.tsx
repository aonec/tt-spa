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
import {
  CalculatorPlacemark,
  ResourcesPlacemarksLookup,
} from './TasksMapView.constants';
import { EActResourceType, EResourceType } from 'myApi';

export const TasksMapView: FC<TasksMapViewProps> = ({
  taskTypes,
  housingStocksWithTasks,
  applyFilters,
  filtrationValues,
  resetFilters,
  isLoadingHousingStocksWithTasks,
  selectedHousingStock,
  handleClickMarker,
}) => {
  const center = [
    housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude || 55.6366,
    housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
      51.8245,
  ];

  return (
    <Wrapper>
      <TasksMapFiltration
        taskTypes={taskTypes}
        applyFilters={applyFilters}
        filtrationValues={filtrationValues}
        resetFilters={resetFilters}
        isLoadingHousingStocksWithTasks={isLoadingHousingStocksWithTasks}
        selectedHousingStock={selectedHousingStock}
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
            String(housingStockWithTask.tasks?.length).length === 2
              ? 24.5
              : 27.3;

          const allTasksResources = housingStockWithTask.tasks?.reduce(
            (acc, elem) => [...acc, ...(elem.resourceTypes || [])],
            [] as EResourceType[],
          );

          const placemarkSvgCodeText = allTasksResources?.length
            ? ResourcesPlacemarksLookup[
                (allTasksResources?.length || 1) > 1
                  ? EActResourceType.All
                  : allTasksResources?.[0]
              ]
            : CalculatorPlacemark;

          const svgCodeText = `
            <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${placemarkSvgCodeText}
              ${
                (housingStockWithTask.tasks?.length || 0) > 1 &&
                `<path d="M22.3147 8.5C22.3147 4.35786 25.6726 1 29.8147 1V1C33.9569 1 37.3147 4.35786 37.3147 8.5V8.5C37.3147 12.6421 33.9569 16 29.8147 16V16C25.6726 16 22.3147 12.6421 22.3147 8.5V8.5Z" fill="#272F5A" stroke="white"/>
                   <text x="${textPosition}px" y="11.4px" font-family="PTRootUIWeb" fill="white" style="font: 9px sans-serif;">${housingStockWithTask.tasks?.length}</text>      
                `
              }
            </svg>`;

          const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

          console.log(placemarkSvgCodeText, svgCodeText);

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
