import React, { FC, useEffect, useRef, useState } from 'react';
import { TasksMapProps } from './TasksMap.types';
import { getTaskPlacemarkerLink } from '../TasksMapView.utils';
import { Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

export const TasksMap: FC<TasksMapProps> = React.memo(
  ({ housingStocksWithTasks, handleClickMarker }) => {
    const [zoom, setZoom] = useState<number | null>(null);

    const mapRef = useRef<null | { _zoom?: number }>(null);

    const center = [
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
        55.6366,
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
        51.8245,
    ];

    useEffect(() => {
      console.log(zoom);
    }, [zoom]);

    useEffect(() => {
      const timer = setInterval(() => {
        const currentZoom = mapRef?.current?._zoom;

        if (!currentZoom || zoom === currentZoom) return;

        setZoom(currentZoom);
      }, 100);

      return () => clearInterval(timer);
    }, [setZoom, mapRef, zoom]);

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
