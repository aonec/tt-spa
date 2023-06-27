import React, { FC, useMemo } from 'react';
import {
  ControlButtonsWrapper,
  Header,
  MapWrapper,
  Wrapper,
} from './CreateDistrictBorderMapPage.styled';
import { Props } from './CreateDistrictBorderMapPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderPlacemarks } from 'hooks/ymaps/utils';
import { getBuildingPlacmearks } from './CreateDistrictBorderMapPage.utils';

export const CreateDistrictBorderMapPage: FC<Props> = ({
  existingHousingStocks,
}) => {
  const { map, mapRef } = useYMaps();

  const buildingsPlacemarks = useMemo(
    () => getBuildingPlacmearks(existingHousingStocks),
    [existingHousingStocks],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  return (
    <Wrapper>
      <Header>
        <div>
          <GoBack />
        </div>
        <ControlButtonsWrapper>
          <Button>Создать район</Button>
        </ControlButtonsWrapper>
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </Wrapper>
  );
};
