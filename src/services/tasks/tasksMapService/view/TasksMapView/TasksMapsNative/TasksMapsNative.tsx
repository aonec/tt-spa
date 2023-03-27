import { useYMaps } from '@pbe/react-yandex-maps';
import React, { FC, useEffect, useRef } from 'react';
import { TasksMapsNativeProps } from './TasksMapsNative.types';

export const TasksMapsNative: FC<TasksMapsNativeProps> = () => {
  const mapRef = useRef(null);
  const ymaps = useYMaps(['Map']);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 10,
    });
  }, [ymaps]);

  return <div ref={mapRef} style={{ width: '100%', height: '84vh' }} />;
};
