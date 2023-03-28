import { useYMaps } from '@pbe/react-yandex-maps';
import React, { FC, useEffect, useRef, useState } from 'react';
import { getTaskPlacemarkerLink } from '../TasksMap/TasksMap.utils';
import { TasksMapsNativeProps } from './TasksMapsNative.types';

export const TasksMapsNative: FC<TasksMapsNativeProps> = ({
  housingStocksWithTasks,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymaps = useYMaps(['Map', 'Placemark']);
  const [map, setMap] = useState<ymaps.Map | null>(null);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
    });

    setMap(map);
  }, [ymaps, mapRef]);

  useEffect(() => {
    if (!ymaps?.Placemark || !map) return;

    map.geoObjects.removeAll();

    housingStocksWithTasks.forEach((housingStockWithTasks) => {
      const { iconHrev, size } = getTaskPlacemarkerLink(
        housingStockWithTasks.tasks || [],
      );

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
        },
      );

      map.geoObjects.add(placemark);
    });

    map.container.fitToViewport();
  }, [housingStocksWithTasks, map, ymaps]);

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '84vh' }} />
    </>
  );
};
