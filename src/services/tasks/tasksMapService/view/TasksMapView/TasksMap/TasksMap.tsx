import React, { FC } from 'react';
import { TasksMapProps } from './TasksMap.types';
import { getTaskPlacemarkerLink } from '../TasksMapView.utils';
import {
  Map,
  FullscreenControl,
  ZoomControl,
  Placemark,
  Clusterer,
} from '@pbe/react-yandex-maps';

export const TasksMap: FC<TasksMapProps> = React.memo(
  ({ housingStocksWithTasks, handleClickMarker }) => {
    const center = [
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
        55.6366,
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
        51.8245,
    ];

    return (
      <Map
        width={'100%'}
        height={'calc(100vh - 130px)'}
        defaultState={{
          center,
          zoom: 16,
        }}
      >
        <Clusterer
          options={{
            groupByCoordinates: false,
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
                        housingStockWithTasks.housingStock?.coordinates
                          .latitude,
                        housingStockWithTasks.housingStock?.coordinates
                          .longitude,
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
        </Clusterer>
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
    );
  },
);
