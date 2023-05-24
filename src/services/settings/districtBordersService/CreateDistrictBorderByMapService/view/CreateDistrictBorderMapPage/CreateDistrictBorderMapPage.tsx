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

  const ymaps = useYMaps(['Map', 'Placemark', 'Clusterer']);

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

  return (
    <Wrapper>
      <Header>
        <GoBack />
        <Button>Создать район</Button>
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </Wrapper>
  );
};
