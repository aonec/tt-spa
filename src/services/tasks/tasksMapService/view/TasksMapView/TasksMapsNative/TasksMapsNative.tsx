import { useYMaps } from '@pbe/react-yandex-maps';
import { HousingStockWithTasksResponse } from 'myApi';
import React, { FC, useEffect, useRef, useState } from 'react';
import { EXTENDED_PLACEMARK_ZOOM_LIMIT } from '../TasksMap/TaskMap.constants';
import {
  getExtendedMapMarkerlayoutLink,
  getTaskPlacemarkerLink,
} from '../TasksMap/TasksMap.utils';
import { TasksMapsNativeProps } from './TasksMapsNative.types';
import { getClusterIcon } from './TasksMapsNative.utils';

export const TasksMapsNative: FC<TasksMapsNativeProps> = ({
  housingStocksWithTasks,
  handleClickMarker,
  selectedHousingStockId,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymaps = useYMaps(['Map', 'Placemark', 'Clusterer']);
  const [map, setMap] = useState<ymaps.Map | null>(null);
  const [clusterer, setClusterer] = useState<ymaps.Clusterer | null>(null);
  const [isExtendedPlacemark, setIsExtendedPlacemarks] =
    useState<boolean>(false);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
    });

    const clusterer = new ymaps.Clusterer();

    clusterer.createCluster = (center, geoObjects) => {
      const housingStocksWithTasksList = geoObjects.reduce((acc, elem) => {
        const housingStockWithTasks = (elem.state as any)
          .housingStockData as HousingStockWithTasksResponse;

        if (!housingStockWithTasks) return acc;

        return [...acc, housingStockWithTasks];
      }, [] as HousingStockWithTasksResponse[]);

      return new ymaps.Placemark(
        center,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: getClusterIcon(housingStocksWithTasksList).iconHrev,
          iconImageSize: [51, 51],
        },
      );
    };

    map.events.add('boundschange', (event) => {
      setIsExtendedPlacemarks(
        (event.originalEvent as unknown as { newZoom: number }).newZoom >=
          EXTENDED_PLACEMARK_ZOOM_LIMIT,
      );
    });

    setMap(map);
    setClusterer(clusterer);

    map.geoObjects.add(clusterer as unknown as ymaps.ObjectManager);
  }, [ymaps, mapRef]);

  useEffect(() => {
    if (!ymaps?.Placemark || !clusterer) return;

    clusterer.removeAll();

    const placemarks = housingStocksWithTasks.map((housingStockWithTasks) => {
      const isSelected =
        selectedHousingStockId === housingStockWithTasks.housingStock?.id;

      const { iconHrev, size, isExtended } =
        isExtendedPlacemark || isSelected
          ? getExtendedMapMarkerlayoutLink(housingStockWithTasks.tasks || [])
          : getTaskPlacemarkerLink(housingStockWithTasks.tasks || []);

      const placemark = new ymaps.Placemark(
        [
          housingStockWithTasks.housingStock?.coordinates?.latitude || 0,
          housingStockWithTasks.housingStock?.coordinates?.longitude || 0,
        ],
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: iconHrev,
          iconImageSize: [size.width, size.height],
          iconOffset: [
            -(size.width / 2),
            (isExtendedPlacemark || isSelected) && isExtended ? -20 : 0,
          ],
          zIndex: isSelected ? 1000 : undefined,
        },
      );

      (placemark.state as any).housingStockData = housingStockWithTasks;

      placemark.events.add('click', () =>
        handleClickMarker(housingStockWithTasks),
      );

      return placemark;
    });

    clusterer.add(placemarks);
  }, [
    clusterer,
    housingStocksWithTasks,
    map,
    ymaps,
    handleClickMarker,
    isExtendedPlacemark,
    selectedHousingStockId,
  ]);

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '84vh' }} />
    </>
  );
};
