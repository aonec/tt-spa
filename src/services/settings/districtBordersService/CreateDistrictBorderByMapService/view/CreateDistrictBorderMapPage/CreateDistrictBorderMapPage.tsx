import React, { FC, useEffect, useRef, useState } from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import {
  Header,
  Wrapper,
  MapWrapper,
} from './CreateDistrictBorderMapPage.styled';
import { CreateDistrictBorderMapPageProps } from './CreateDistrictBorderMapPage.types';

export const CreateDistrictBorderMapPage: FC<
  CreateDistrictBorderMapPageProps
> = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [, setMap] = useState<ymaps.Map | null>(null);

  const ymaps = useYMaps([
    'Map',
    'Polygon',
    'map.GeoObjects',
    'geometryEditor.Polygon',
    'Monitor',
  ]);

  const [district, setDistrict] = useState<ymaps.Polygon | null>(null);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
    });

    const district = new ymaps.Polygon(
      [
        // Координаты внешнего контура.
        [
          [55.6366, 51.8245],
          [55.6586, 51.8445],
        ],
        // Координаты внутреннего контура.
        [
          [55.6586, 51.8445],
          [55.6566, 51.884],
        ],
        [
          [55.6566, 51.8845],
          [55.6866, 51.9848],
        ],
      ],
      {},
      {
        // Курсор в режиме добавления новых вершин.
        cursor: 'crosshair',
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Ширина обводки.
        strokeWidth: 5,
      },
    );
    // Добавляем многоугольник на карту.
    map.geoObjects.add(district);

    setDistrict(district);
    setMap(map);
  }, [ymaps, mapRef]);

  useEffect(() => {
    console.log(district);
  }, [district]);

  return (
    <Wrapper>
      <Header>
        <GoBack />
        <Button
          onClick={() => {
            console.log(district);
            (district?.editor as any)?.startDrawing?.();
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
