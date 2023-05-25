import React, { FC, useEffect, useRef, useState } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import {
  Header,
  Wrapper,
  MapWrapper,
} from './CreateDistrictBorderMapPage.styled';
import { CreateDistrictBorderMapPageProps } from './CreateDistrictBorderMapPage.types';
import { ymaps } from './CreateDistrictBorderMapPage.types';

export const CreateDistrictBorderMapPage: FC<
  CreateDistrictBorderMapPageProps
> = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [district, setDistrict] = useState<ymaps.Polygon | null>(null);

  const initMaps = () => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
      controls: [],
    });

    map.cursors.push('CROSSHAIR');

    const district = new ymaps.Polygon(
      [],
      {},
      {
        // Курсор в режиме добавления новых вершин.
        cursor: 'crosshair',
        // Цвет заливки.
        fillColor: 'rgba(24, 158, 233, 0.16)',
        // Цвет обводки.
        strokeColor: '#189EE9',
        // Ширина обводки.
        strokeWidth: 3,
      },
    );
    // Добавляем многоугольник на карту.
    map.geoObjects.add(district);

    setDistrict(district);
  };

  useEffect(() => {
    ymaps.ready(initMaps);
  }, [mapRef]);

  return (
    <Wrapper>
      <Header>
        <GoBack />
        <Button
          onClick={() => {
            console.log(district);
            (district as any)?.editor?.startDrawing?.();
          }}
        >
          Создать район
        </Button>
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </Wrapper>
  );
};
