import { useYMaps } from '@pbe/react-yandex-maps';
import React, { FC, useEffect, useRef, useState } from 'react';
import { getTaskPlacemarkerLink } from '../TasksMap/TasksMap.utils';
import { TasksMapsNativeProps } from './TasksMapsNative.types';

export const TasksMapsNative: FC<TasksMapsNativeProps> = ({
  housingStocksWithTasks,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymaps = useYMaps(['Map', 'Placemark', 'Clusterer']);
  const [map, setMap] = useState<ymaps.Map | null>(null);
  const [clusterer, setClusterer] = useState<ymaps.Clusterer | null>(null);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
    });

    const clusterer = new ymaps.Clusterer();

    setMap(map);
    setClusterer(clusterer);

    map.geoObjects.add(clusterer as unknown as ymaps.ObjectManager);
  }, [ymaps, mapRef]);

  useEffect(() => {
    console.log(clusterer);
    if (!ymaps?.Placemark || !clusterer) return;

    clusterer.removeAll();

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

      clusterer.add(placemark);
    });
  }, [clusterer, housingStocksWithTasks, map, ymaps]);

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '84vh' }} />
    </>
  );
};
