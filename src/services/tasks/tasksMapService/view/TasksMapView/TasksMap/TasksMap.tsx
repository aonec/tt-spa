import React, { FC, useEffect, useRef, useState } from 'react';
import { TasksMapProps } from './TasksMap.types';
import { Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';
import { EXTENDED_PLACEMARK_ZOOM_LIMIT } from './TaskMap.constants';
import {
  getExtendedMapMarkerlayoutLink,
  getTaskPlacemarkerLink,
} from './TasksMap.utils';

export const TasksMap: FC<TasksMapProps> = React.memo(
  ({ housingStocksWithTasks, handleClickMarker, selectedHousingStockId }) => {
    const [isExtendedPlacemark, setIsExtendedPlacemarks] =
      useState<boolean>(false);

    const mapRef = useRef<null | { _zoom?: number }>(null);

    console.log(mapRef);

    const [center, setCenter] = useState([
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
        55.6366,
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
        51.8245,
    ]);

    useEffect(() => {
      setCenter([
        housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
          55.6366,
        housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
          51.8245,
      ]);
    }, [housingStocksWithTasks, setCenter]);

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
        state={{
          center,
        }}
        defaultState={{
          center,
          zoom: 16,
        }}
        instanceRef={mapRef}
      >
        {housingStocksWithTasks.map((housingStockWithTasks) => {
          const isSelected =
            selectedHousingStockId === housingStockWithTasks.housingStock?.id;
          const { iconHrev, size } =
            isExtendedPlacemark || isSelected
              ? getExtendedMapMarkerlayoutLink(
                  housingStockWithTasks.tasks || [],
                )
              : getTaskPlacemarkerLink(housingStockWithTasks.tasks || []);

          return (
            <Placemark
              key={housingStockWithTasks.housingStock?.id}
              onClick={() => {
                handleClickMarker(housingStockWithTasks);

                const coordinates =
                  housingStockWithTasks.housingStock?.coordinates;

                if (coordinates?.latitude && coordinates?.longitude) {
                  setCenter([coordinates?.latitude, coordinates?.longitude]);
                }
              }}
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
                iconImageSize: [size.width, size.height],
                iconOffset: [
                  -(size.width / 2),
                  isExtendedPlacemark || isSelected ? -20 : 0,
                ],
                zIndex: isSelected ? 1000 : undefined,
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
