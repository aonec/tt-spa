import React, { FC, useEffect, useRef, useState } from 'react';
import { TasksMapProps } from './TasksMap.types';
import { Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';
import { EXTENDED_PLACEMARK_ZOOM_LIMIT } from './TaskMap.constants';
import { getTaskPlacemarkerLink } from './TasksMap.utils';

export const TasksMap: FC<TasksMapProps> = React.memo(
  ({ housingStocksWithTasks, handleClickMarker }) => {
    const [isExtenedPlacemarks, setIsExtendedPlacemarks] =
      useState<boolean>(false);

    const mapRef = useRef<null | { _zoom?: number }>(null);

    const center = [
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
        55.6366,
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
        51.8245,
    ];

    useEffect(() => {
      console.log(isExtenedPlacemarks);
    }, [isExtenedPlacemarks]);

    useEffect(() => {
      const timer = setInterval(() => {
        const currentZoom = mapRef?.current?._zoom;

        if (!currentZoom) return;

        setIsExtendedPlacemarks(EXTENDED_PLACEMARK_ZOOM_LIMIT <= currentZoom);
      }, 300);

      return () => clearInterval(timer);
    }, [setIsExtendedPlacemarks, mapRef]);

    return (
      <Map
        width={'100%'}
        height={'calc(100vh - 130px)'}
        defaultState={{
          center,
          zoom: 16,
        }}
        instanceRef={mapRef}
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
        <ZoomControl
          options={{
            position: {
              top: 16,
              right: 16,
            },
          }}
        />
      </Map>
    );
  },
);
