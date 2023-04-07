import React, { FC, useEffect, useRef, useState } from 'react';
import { TasksMapProps } from './TasksMap.types';
import { Map, ZoomControl, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { EXTENDED_PLACEMARK_ZOOM_LIMIT } from './TaskMap.constants';
import {
  getExtendedMapMarkerlayoutLink,
  getTaskPlacemarkerLink,
} from './TasksMap.utils';
import { featureToggles } from 'featureToggles';

export const TasksMap: FC<TasksMapProps> = React.memo(
  ({ housingStocksWithTasks, handleClickMarker, selectedHousingStockId }) => {
    const [isExtendedPlacemark, setIsExtendedPlacemarks] =
      useState<boolean>(false);

    const mapRef = useRef<null | any>(null);

    const center = [
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
        55.6366,
      housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
        51.8245,
    ];

    useEffect(() => {
      const center = [
        housingStocksWithTasks?.[0]?.housingStock?.coordinates?.latitude ||
          55.6366,
        housingStocksWithTasks?.[0]?.housingStock?.coordinates?.longitude ||
          51.8245,
      ];

      mapRef.current?.setCenter?.(center);
    }, [mapRef, housingStocksWithTasks]);

    const placemarks = housingStocksWithTasks.map((housingStockWithTasks) => {
      const isSelected =
        selectedHousingStockId === housingStockWithTasks.housingStock?.id;
      const { iconHrev, size, isExtended } =
        isExtendedPlacemark || isSelected
          ? getExtendedMapMarkerlayoutLink(housingStockWithTasks.tasks || [])
          : getTaskPlacemarkerLink(housingStockWithTasks.tasks || []);

      return (
        <Placemark
          key={housingStockWithTasks.housingStock?.id}
          onClick={() => {
            handleClickMarker(housingStockWithTasks);
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
              (isExtendedPlacemark || isSelected) && isExtended ? -20 : 0,
            ],
            zIndex: isSelected ? 1000 : undefined,
          }}
        />
      );
    });

    return (
      <Map
        width={'100%'}
        height={'calc(100vh - 130px)'}
        defaultState={{
          center,
          zoom: 16,
        }}
        instanceRef={mapRef}
        onBoundsChange={(event: { originalEvent: { newZoom: number } }) => {
          setIsExtendedPlacemarks(
            event.originalEvent.newZoom >= EXTENDED_PLACEMARK_ZOOM_LIMIT,
          );
        }}
      >
        {featureToggles.taskMaps.clasterization && (
          <Clusterer
            options={{
              preset: 'islands#nightClusterIcons',
              groupByCoordinates: false,
            }}
          >
            {placemarks}
          </Clusterer>
        )}
        {!featureToggles.taskMaps.clasterization && placemarks}
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
