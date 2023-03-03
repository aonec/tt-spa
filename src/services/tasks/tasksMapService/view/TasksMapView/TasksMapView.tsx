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
import { getTaskPlacemarkerLink } from './TasksMapView.utils';

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
        {housingStocksWithTasks.map((housingStockWithTasks) => {
          const iconHrev = getTaskPlacemarkerLink(housingStockWithTasks);

          return (
            <Placemark
              key={housingStockWithTasks.housingStock?.id}
              onClick={() => handleClickMarker(housingStockWithTasks)}
              defaultGeometry={
                housingStockWithTasks.housingStock?.coordinates
                  ? [
                      housingStockWithTasks.housingStock?.coordinates.latitude,
                      housingStockWithTasks.housingStock?.coordinates.longitude,
                    ]
                  : undefined
              }
              options={{
                iconLayout: 'default#image',
                iconImageHref: iconHrev,
                iconImageSize: [52, 52],
              }}
            />
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
